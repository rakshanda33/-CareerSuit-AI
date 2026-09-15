from fastapi import APIRouter, UploadFile, File, Form

from analyzer import check_ats_match
from utils import extract_text_from_pdf
from logger_config import get_logger

logger = get_logger(__name__)

router = APIRouter(
    prefix="/job-match",
    tags=["Job Match"]
)


@router.post("")
async def job_match(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    logger.info(
        f"POST /job-match | "
        f"filename={file.filename} | "
        f"jd_length={len(job_description)}"
    )

    resume_text = extract_text_from_pdf(file.file)

    if len(resume_text.strip()) < 100:
        raise ValueError(
            "Resume text is too short. "
            "Please upload a valid text-based PDF."
        )

    if len(job_description.strip()) < 50:
        raise ValueError(
            "Job description is too short. "
            "Please paste the full job description."
        )

    return check_ats_match(
        resume_text[:3000],
        job_description.strip()[:2000]
    )