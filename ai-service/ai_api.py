from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from utils import extract_text_from_pdf
from analyzer import analyze_resume, check_ats_match

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    resume_text = extract_text_from_pdf(file.file)

    result = analyze_resume(resume_text)

    return result


@app.post("/job-match")
async def job_match(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    resume_text = extract_text_from_pdf(file.file)

    result = check_ats_match(
        resume_text=resume_text,
        job_description=job_description
    )

    return result