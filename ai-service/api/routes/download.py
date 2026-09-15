from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from docx_generator import create_tailored_resume_docx

router = APIRouter(
    prefix="/resume-tailor",
    tags=["Resume Tailor"]
)


@router.post("/download")
async def download_tailored_resume(data: dict):
    try:
        file_stream = create_tailored_resume_docx(data)

        return StreamingResponse(
            file_stream,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={
                "Content-Disposition":
                    "attachment; filename=CareerSuit_Tailored_Resume.docx"
            },
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate Word document: {str(e)}"
        )