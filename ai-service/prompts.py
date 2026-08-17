# prompts.py


# ──────────────────────────────────────────────────────────────
# Resume Analysis
# ──────────────────────────────────────────────────────────────

RESUME_ANALYSIS_PROMPT = """
You are a senior technical recruiter with 10+ years hiring engineers at top tech companies.

Analyze the resume below.

OUTPUT FORMAT — read carefully:
Respond with ONLY a single JSON object and nothing else.
Do not include markdown code fences (no ``` of any kind).
Do not include any explanation, preamble, or commentary before or after the JSON.
Do not say "Here is the analysis" or anything similar.
The very first character of your response must be {{ and the very last character must be }}.

Required structure:
{{
    "score": <integer 0-100>,
    "verdict": "<Hire | Strong Maybe | Maybe | No Hire>",
    "summary": "<2-3 sentence overall assessment>",
    "strengths": [
        "<specific, evidence-based strength 1>",
        "<specific, evidence-based strength 2>",
        "<specific, evidence-based strength 3>"
    ],
    "weaknesses": [
        "<specific weakness 1>",
        "<specific weakness 2>",
        "<specific weakness 3>"
    ],
    "improvements": [
        "<actionable improvement tip 1>",
        "<actionable improvement tip 2>",
        "<actionable improvement tip 3>",
        "<actionable improvement tip 4>"
    ],
    "missing_sections": ["<e.g. GitHub links>", "<e.g. certifications>"],
    "skills_found": ["<skill 1>", "<skill 2>", "<skill 3>"],
    "ats_issues": [
        "<e.g. Uses tables which ATS cannot parse>",
        "<e.g. Missing quantified achievements>"
    ]
}}

RESUME TEXT:
{resume_text}
"""


# ──────────────────────────────────────────────────────────────
# ATS Job Match
# ──────────────────────────────────────────────────────────────

ATS_MATCH_PROMPT = """
You are an ATS (Applicant Tracking System) scanner.

Compare the resume and job description below.

OUTPUT FORMAT — read carefully:
Respond with ONLY a single JSON object and nothing else.
Do not include markdown code fences (no ``` of any kind).
Do not include any explanation, preamble, or commentary before or after the JSON.
The very first character of your response must be {{ and the very last character must be }}.

{{
    "ats_score": <integer 0-100>,
    "matched_keywords": ["<keyword found in both>"],
    "missing_keywords": ["<important JD keyword absent from resume>"],
    "match_summary": "<2 sentence summary of fit>",
    "recommendation": "<Tailor resume | Good match | Strong match>"
}}

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}
"""


# ──────────────────────────────────────────────────────────────
# Bullet Point Rewriter
# ──────────────────────────────────────────────────────────────

BULLET_REWRITE_PROMPT = """
You are an expert resume writer.

Rewrite the bullet point below into 3 stronger versions.

Rules:
- Use strong action verbs.
- Quantify impact where possible.
- Do not invent facts, numbers, achievements, technologies, or responsibilities.
- Keep each version under 20 words.
- Make each version professional and ATS-friendly.

OUTPUT FORMAT — read carefully:
Respond with ONLY a single JSON object and nothing else.
Do not include markdown code fences (no ``` of any kind).
Do not include any explanation, preamble, or commentary before or after the JSON.
The very first character of your response must be {{ and the very last character must be }}.

{{
    "rewrites": [
        "<stronger version 1>",
        "<stronger version 2>",
        "<stronger version 3>"
    ]
}}

BULLET: {bullet}
"""


# ──────────────────────────────────────────────────────────────
# Resume Tailor
# ──────────────────────────────────────────────────────────────

RESUME_TAILOR_PROMPT = """
You are an expert resume writer, technical recruiter, and ATS optimization specialist.

Your task is to tailor a candidate's resume for a specific job description.

IMPORTANT RULES:
- Do not invent experience, education, projects, certifications, skills, responsibilities, or achievements.
- Only use information that is actually present in the resume.
- Do not create fake metrics or numbers.
- Improve wording and presentation while preserving the candidate's actual experience.
- Identify relevant keywords from the job description.
- Only recommend keywords that are relevant to the candidate's existing background.
- Make the content professional, concise, and ATS-friendly.
- Prioritize skills and experience that are relevant to the target job.
- Keep the candidate's original meaning intact.
- Do not claim the candidate has experience they do not have.

OUTPUT FORMAT — read carefully:
Respond with ONLY a single JSON object and nothing else.
Do not include markdown code fences (no ``` of any kind).
Do not include any explanation, preamble, or commentary before or after the JSON.
Do not say "Here is the tailored resume" or anything similar.
The very first character of your response must be {{ and the very last character must be }}.

Required structure:
{{
    "professional_summary": "<tailored 2-3 sentence professional summary based only on the resume>",
    "key_skills": [
        "<relevant skill 1>",
        "<relevant skill 2>",
        "<relevant skill 3>",
        "<relevant skill 4>",
        "<relevant skill 5>"
    ],
    "tailored_bullets": [
        {{
            "original": "<original resume bullet>",
            "improved": "<improved ATS-friendly version>"
        }}
    ],
    "keywords_to_add": [
        "<relevant keyword from job description that is missing or weakly represented>"
    ],
    "recommendations": [
        "<specific recommendation for tailoring the resume>",
        "<specific recommendation for improving ATS compatibility>",
        "<specific recommendation for highlighting relevant experience>"
    ]
}}

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}
"""