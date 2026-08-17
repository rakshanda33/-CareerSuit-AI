from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from utils import extract_text_from_pdf
from analyzer import (
    analyze_resume,
    check_ats_match,
    tailor_resume,
)
from docx_generator import create_tailored_resume_docx


app = FastAPI()


# ──────────────────────────────────────────────────────────────
# CORS
# ──────────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ──────────────────────────────────────────────────────────────
# Root
# ──────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {
        "message": "CareerSuit AI Service is running 🚀"
    }


# ──────────────────────────────────────────────────────────────
# Resume Analysis
# ──────────────────────────────────────────────────────────────

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    resume_text = extract_text_from_pdf(file.file)

    return analyze_resume(resume_text)


# ──────────────────────────────────────────────────────────────
# Job Description Match
# ──────────────────────────────────────────────────────────────

@app.post("/job-match")
async def job_match(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    resume_text = extract_text_from_pdf(file.file)

    return check_ats_match(
        resume_text=resume_text,
        job_description=job_description
    )


# ──────────────────────────────────────────────────────────────
# Resume Tailor
# ──────────────────────────────────────────────────────────────

@app.post("/resume-tailor")
async def resume_tailor(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    resume_text = extract_text_from_pdf(file.file)

    return tailor_resume(
        resume_text=resume_text,
        job_description=job_description
    )


# ──────────────────────────────────────────────────────────────
# Download Tailored Resume as Editable DOCX
# ──────────────────────────────────────────────────────────────

@app.post("/resume-tailor/download")
async def download_tailored_resume(data: dict):
    try:
        file_stream = create_tailored_resume_docx(data)

        return StreamingResponse(
            file_stream,
            media_type=(
                "application/vnd.openxmlformats-officedocument."
                "wordprocessingml.document"
            ),
            headers={
                "Content-Disposition": (
                    "attachment; "
                    "filename=CareerSuit_Tailored_Resume.docx"
                )
            },
        )

    except Exception as e:
        print("DOCX Generation Error:", e)

        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate Word document: {str(e)}"
        )