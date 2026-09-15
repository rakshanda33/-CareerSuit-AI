import io
import json
import re

from PyPDF2 import PdfReader

from config import MAX_PDF_PAGES, MIN_RESUME_CHARS


def extract_text_from_pdf(pdf_file) -> str:
    """
    Safely extract text from a PDF uploaded through FastAPI or Streamlit.

    PDF files are binary files, so they must never be decoded using UTF-8.
    """

    try:
        # Reset file pointer
        if hasattr(pdf_file, "seek"):
            pdf_file.seek(0)

        # Read raw binary bytes
        pdf_bytes = pdf_file.read()

        if not pdf_bytes:
            raise ValueError("The uploaded PDF is empty.")

        # Validate PDF signature
        if not pdf_bytes.startswith(b"%PDF"):
            raise ValueError("The uploaded file is not a valid PDF.")

        # Use an in-memory binary stream
        pdf_stream = io.BytesIO(pdf_bytes)

        # Parse PDF as binary
        reader = PdfReader(pdf_stream)

        # Handle password-protected PDFs
        if reader.is_encrypted:
            try:
                result = reader.decrypt("")

                if result == 0:
                    raise ValueError(
                        "This PDF is password-protected. "
                        "Please upload an unlocked PDF."
                    )

            except ValueError:
                raise
            except Exception:
                raise ValueError(
                    "This PDF is password-protected. "
                    "Please upload an unlocked PDF."
                )

        if len(reader.pages) == 0:
            raise ValueError("This PDF has no pages.")

        pages = reader.pages[:MAX_PDF_PAGES]

        text_parts = []

        for page_number, page in enumerate(pages, start=1):
            try:
                extracted = page.extract_text()

            except Exception as e:
                print(
                    f"Warning: Could not extract text from "
                    f"page {page_number}: {e}"
                )
                continue

            if extracted:
                # Remove problematic/control characters
                extracted = (
                    extracted
                    .replace("\x00", "")
                    .replace("\ufeff", "")
                    .replace("\u200b", "")
                    .replace("\xa0", " ")
                )

                # Normalize whitespace
                extracted = re.sub(
                    r"[ \t]+",
                    " ",
                    extracted
                )

                extracted = extracted.strip()

                if extracted:
                    text_parts.append(extracted)

        full_text = "\n\n".join(text_parts).strip()

        # Make sure enough text was extracted
        if len(full_text) < MIN_RESUME_CHARS:
            raise ValueError(
                "Could not extract enough text from this PDF. "
                "The PDF may be scanned or image-based. "
                "Please upload a text-based PDF."
            )

        return full_text

    except ValueError:
        raise

    except Exception as e:
        print(f"PDF extraction error: {repr(e)}")

        raise ValueError(
            "Could not read this PDF. "
            "Please upload a valid text-based PDF."
        )


def parse_json_from_llm(text: str) -> dict:
    """
    Safely parse JSON returned by the LLM.
    Handles markdown code fences and extra text.
    """

    if not text:
        raise ValueError("AI returned an empty response.")

    text = text.strip()

    # Remove markdown code fences
    text = re.sub(
        r"^```(?:json)?\s*",
        "",
        text,
        flags=re.IGNORECASE
    )

    text = re.sub(
        r"\s*```$",
        "",
        text
    )

    text = text.strip()

    # First attempt: direct JSON parsing
    try:
        return json.loads(text)

    except json.JSONDecodeError:
        pass

    # Find JSON object inside extra text
    start = text.find("{")

    if start == -1:
        raise ValueError("No valid JSON object found in AI response.")

    depth = 0
    in_string = False
    escape = False

    for i in range(start, len(text)):
        char = text[i]

        if escape:
            escape = False
            continue

        if char == "\\":
            escape = True
            continue

        if char == '"':
            in_string = not in_string
            continue

        if in_string:
            continue

        if char == "{":
            depth += 1

        elif char == "}":
            depth -= 1

            if depth == 0:
                json_text = text[start:i + 1]

                try:
                    return json.loads(json_text)
                except json.JSONDecodeError:
                    break

    raise ValueError(
        "AI returned an invalid or incomplete JSON response."
    )


def score_to_color(score: int) -> str:
    """Return a color category based on score."""

    if score >= 80:
        return "green"

    if score >= 60:
        return "orange"

    return "red"


def score_to_emoji(score: int) -> str:
    """Return an emoji based on score."""

    if score >= 80:
        return "🟢"

    if score >= 60:
        return "🟡"

    return "🔴"