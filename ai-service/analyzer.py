# analyzer.py

import time

from google import genai
from google.genai import types

from config import (
    GEMINI_API_KEY,
    GEMINI_MODEL,
    TEMPERATURE,
    THINKING_BUDGET,
    MAX_TOKENS,
)

from prompts import (
    RESUME_ANALYSIS_PROMPT,
    ATS_MATCH_PROMPT,
    BULLET_REWRITE_PROMPT,
    RESUME_TAILOR_PROMPT,
)

from utils import parse_json_from_llm


# ──────────────────────────────────────────────────────────────
# Gemini Setup
# ──────────────────────────────────────────────────────────────

if not GEMINI_API_KEY:
    raise EnvironmentError(
        "GEMINI_API_KEY not found. "
        "Create a .env file with: GEMINI_API_KEY=your_key_here"
    )

client = genai.Client(api_key=GEMINI_API_KEY)


# ──────────────────────────────────────────────────────────────
# Gemini Helper
# ──────────────────────────────────────────────────────────────

def _call_gemini(prompt: str) -> str:
    """
    Central Gemini API helper.

    Handles:
    - JSON output
    - Thinking budget
    - Empty responses
    - MAX_TOKENS
    - Temporary Gemini failures
    - Rate limits
    - API key errors
    """

    MAX_RETRIES = 5
    last_error: Exception | None = None

    for attempt in range(MAX_RETRIES):

        try:
            response = client.models.generate_content(
                model=GEMINI_MODEL,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=TEMPERATURE,
                    max_output_tokens=MAX_TOKENS,
                    thinking_config=types.ThinkingConfig(
                        thinking_budget=THINKING_BUDGET
                    ),
                    response_mime_type="application/json",
                ),
            )

            # ──────────────────────────────────────────────
            # Check finish reason
            # ──────────────────────────────────────────────

            candidates = getattr(response, "candidates", None)

            finish_reason = None

            if candidates:
                finish_reason = getattr(
                    candidates[0],
                    "finish_reason",
                    None
                )

            finish_reason_name = getattr(
                finish_reason,
                "name",
                finish_reason
            )

            if finish_reason_name == "MAX_TOKENS":
                raise RuntimeError(
                    "Gemini ran out of output tokens before finishing "
                    "the JSON response (finish_reason=MAX_TOKENS). "
                    "Increase MAX_TOKENS in config.py or shorten the "
                    "resume/job description input."
                )

            # ──────────────────────────────────────────────
            # Read response
            # ──────────────────────────────────────────────

            text = response.text

            if not text or not text.strip():
                raise RuntimeError(
                    "Gemini returned an empty response "
                    f"(finish_reason={finish_reason_name}). "
                    "This can happen because of safety filtering or "
                    "an unexpected empty generation. Try again."
                )

            return text

        except RuntimeError:
            # Deterministic errors should not be retried.
            raise

        except Exception as e:

            error_msg = str(e).lower()
            last_error = e

            # ──────────────────────────────────────────────
            # Retryable errors
            # ──────────────────────────────────────────────

            is_retryable = (
                "503" in error_msg
                or "unavailable" in error_msg
                or "service is currently unavailable" in error_msg
                or "internal" in error_msg
                or "deadline exceeded" in error_msg
                or "timeout" in error_msg
            )

            if is_retryable and attempt < MAX_RETRIES - 1:

                wait_time = 2 ** attempt

                print(
                    f"Gemini temporarily unavailable "
                    f"(attempt {attempt + 1}/{MAX_RETRIES}): {e}. "
                    f"Retrying in {wait_time}s..."
                )

                time.sleep(wait_time)

                continue

            # ──────────────────────────────────────────────
            # Quota / Rate Limit
            # ──────────────────────────────────────────────

            if (
                "quota" in error_msg
                or "rate" in error_msg
                or "429" in error_msg
                or "resource_exhausted" in error_msg
            ):
                raise RuntimeError(
                    """
⚠️ Gemini free quota exhausted.

Possible fixes:
• Wait 1-2 minutes and try again
• Create another Gemini API key
• Upgrade Gemini quota

The application is working correctly.
Google is temporarily blocking requests because the free limit was reached.
"""
                )

            # ──────────────────────────────────────────────
            # API Key Problems
            # ──────────────────────────────────────────────

            if (
                "api key" in error_msg
                or "401" in error_msg
                or "403" in error_msg
                or "unauthenticated" in error_msg
                or "invalid" in error_msg
            ):
                raise RuntimeError(
                    """
❌ Invalid Gemini API Key.

Check:
1. .env file exists
2. GEMINI_API_KEY is correct
3. Restart the AI service after changing .env
"""
                )

            # ──────────────────────────────────────────────
            # Retryable error after all attempts
            # ──────────────────────────────────────────────

            if is_retryable:
                raise RuntimeError(
                    "⚠️ The Gemini service is temporarily unavailable "
                    f"after {MAX_RETRIES} attempts. Please try again "
                    f"in a few moments. (Last error: {e})"
                )

            # ──────────────────────────────────────────────
            # Unknown error
            # ──────────────────────────────────────────────

            raise RuntimeError(
                f"Gemini API Error: {e}"
            )

    # Defensive fallback
    raise RuntimeError(
        f"Gemini API call failed after {MAX_RETRIES} attempts. "
        f"Last error: {last_error}"
    )


# ──────────────────────────────────────────────────────────────
# Resume Analysis
# ──────────────────────────────────────────────────────────────

def analyze_resume(resume_text: str) -> dict:
    """
    Analyze a resume using Gemini.
    """

    prompt = RESUME_ANALYSIS_PROMPT.format(
        resume_text=resume_text[:4000]
    )

    raw = _call_gemini(prompt)

    return parse_json_from_llm(raw)


# ──────────────────────────────────────────────────────────────
# ATS Matching
# ──────────────────────────────────────────────────────────────

def check_ats_match(
    resume_text: str,
    job_description: str
) -> dict:
    """
    Compare resume against a job description.
    """

    prompt = ATS_MATCH_PROMPT.format(
        resume_text=resume_text[:3000],
        job_description=job_description[:2000]
    )

    raw = _call_gemini(prompt)

    return parse_json_from_llm(raw)


# ──────────────────────────────────────────────────────────────
# Bullet Point Rewriter
# ──────────────────────────────────────────────────────────────

def rewrite_bullet(bullet: str) -> list[str]:
    """
    Rewrite a weak resume bullet into stronger versions.
    """

    prompt = BULLET_REWRITE_PROMPT.format(
        bullet=bullet
    )

    raw = _call_gemini(prompt)

    result = parse_json_from_llm(raw)

    return result.get("rewrites", [])


# ──────────────────────────────────────────────────────────────
# Resume Tailor
# ──────────────────────────────────────────────────────────────

def tailor_resume(
    resume_text: str,
    job_description: str
) -> dict:
    """
    Tailor a resume for a specific job description.

    The AI:
    - Creates a tailored professional summary
    - Identifies relevant skills
    - Improves existing resume bullets
    - Finds relevant missing keywords
    - Provides ATS-focused recommendations

    The AI must not invent:
    - Experience
    - Skills
    - Achievements
    - Metrics
    - Certifications
    - Responsibilities
    """

    prompt = RESUME_TAILOR_PROMPT.format(
        resume_text=resume_text[:5000],
        job_description=job_description[:3000]
    )

    raw = _call_gemini(prompt)

    return parse_json_from_llm(raw)