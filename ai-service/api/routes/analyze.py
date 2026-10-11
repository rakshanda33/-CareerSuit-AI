# api/routes/analyze.py

from fastapi import APIRouter, UploadFile, File, HTTPException

from api.models.response import AnalysisResponse
from analyzer import analyze_resume
from logger_config import get_logger
from utils import extract_text_from_pdf

logger = get_logger(__name__)

router = APIRouter(
    prefix="/analyze",
    tags=["Resume Analysis"]
)


@router.post(
    "",
    response_model=AnalysisResponse,
    summary="Analyze a resume",
    description=(
        "Upload a PDF resume. "
        "The PDF text is extracted safely and analyzed using Gemini."
    ),
    responses={
        200: {"description": "Analysis completed successfully"},
        400: {"description": "Invalid PDF or insufficient resume text"},
        429: {"description": "Gemini API rate limit reached"},
        500: {"description": "Internal server error"},
    }
)
async def analyze(
    file: UploadFile = File(...)
) -> AnalysisResponse:

    logger.info(
        f"POST /analyze | filename={file.filename}"
    )

    # Validate file type
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file was uploaded."
        )

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF resume."
        )

    try:
        # Extract PDF text safely
        resume_text = extract_text_from_pdf(file.file)

        logger.info(
            f"PDF extracted successfully | "
            f"text_length={len(resume_text)} chars"
        )

        # Send extracted text to Gemini
        result = analyze_resume(resume_text)

        return AnalysisResponse(**result)

    except ValueError as e:
        logger.warning(
            f"Resume processing failed: {str(e)}"
        )

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:
        logger.exception(
            f"Unexpected resume analysis error: {str(e)}"
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to analyze the resume."
        )