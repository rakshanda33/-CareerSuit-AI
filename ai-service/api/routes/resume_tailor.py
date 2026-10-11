from fastapi import APIRouter, UploadFile, File, Form

from analyzer import tailor_resume
from utils import extract_text_from_pdf

router = APIRouter(
    prefix="/resume-tailor",
    tags=["Resume Tailor"]
)

@router.post("")
async def resume_tailor(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    resume_text = extract_text_from_pdf(file.file)

    if len(resume_text.strip()) < 100:
        raise ValueError("Resume text is too short.")

    if len(job_description.strip()) < 50:
        raise ValueError("Job description is too short.")

    return tailor_resume(
        resume_text[:5000],
        job_description.strip()[:3000]
    )