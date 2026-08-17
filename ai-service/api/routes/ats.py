from fastapi import APIRouter, UploadFile, File, Form
from api.models.response import ATSResponse
from analyzer import check_ats_match
from utils import extract_text_from_pdf
from logger_config import get_logger

logger = get_logger(__name__)

router = APIRouter(
    prefix="/ats-match",
    tags=["ATS Matching"]
)


@router.post(
    "",
    response_model=ATSResponse,
    summary="Match resume against job description",
)
async def ats_match(
    file: UploadFile = File(...),
    job_description: str = Form(...)
) -> ATSResponse:

    logger.info(
        f"POST /ats-match | "
        f"filename={file.filename} | "
        f"jd_length={len(job_description)}"
    )

    # Extract text from uploaded PDF
    resume_text = extract_text_from_pdf(file.file)

    if not resume_text or len(resume_text.strip()) < 100:
        raise ValueError(
            "Resume text is too short. "
            "Please upload a valid text-based PDF."
        )

    if len(job_description.strip()) < 50:
        raise ValueError(
            "Job description is too short. "
            "Please paste the full job description."
        )

    # Keep Gemini input under control
    resume_text = resume_text[:3000]
    job_description = job_description.strip()[:2000]

    # Compare resume with job description
    result = check_ats_match(
        resume_text,
        job_description
    )

    return ATSResponse(**result)