from fastapi import APIRouter, UploadFile, File
from utils import extract_text_from_pdf
from analyzer import analyze_resume

router = APIRouter(prefix="/upload", tags=["Upload"])

@router.post("")
async def upload_resume(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file.file)
    result = analyze_resume(text)
    return result