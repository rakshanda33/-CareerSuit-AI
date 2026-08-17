from io import BytesIO
from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.section import WD_SECTION


def create_tailored_resume_docx(result: dict) -> BytesIO:
    document = Document()

    # Margins
    section = document.sections[0]
    section.top_margin = Pt(45)
    section.bottom_margin = Pt(45)
    section.left_margin = Pt(55)
    section.right_margin = Pt(55)

    # Default font
    styles = document.styles
    styles["Normal"].font.name = "Arial"
    styles["Normal"].font.size = Pt(10.5)

    # Title
    title = document.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER

    run = title.add_run("CAREERSUIT AI")
    run.bold = True
    run.font.size = Pt(18)

    subtitle = document.add_paragraph()
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER

    run = subtitle.add_run("TAILORED RESUME")
    run.bold = True
    run.font.size = Pt(12)

    # Professional Summary
    add_heading(document, "PROFESSIONAL SUMMARY")

    document.add_paragraph(
        result.get("professional_summary", "")
    )

    # Key Skills
    add_heading(document, "KEY SKILLS")

    skills = result.get("key_skills", [])

    if skills:
        document.add_paragraph(", ".join(skills))

    # Tailored Experience
    add_heading(document, "TAILORED EXPERIENCE")

    bullets = result.get("tailored_bullets", [])

    for index, item in enumerate(bullets, start=1):
        improved = item.get("improved", "")

        paragraph = document.add_paragraph(
            style="List Number"
        )

        paragraph.add_run(improved)

    # Keywords
    add_heading(document, "KEYWORDS TO ADD")

    keywords = result.get("keywords_to_add", [])

    if keywords:
        document.add_paragraph(", ".join(keywords))

    # Recommendations
    add_heading(document, "RECOMMENDATIONS")

    recommendations = result.get("recommendations", [])

    for recommendation in recommendations:
        paragraph = document.add_paragraph(
            style="List Bullet"
        )
        paragraph.add_run(recommendation)

    # Save to memory
    file_stream = BytesIO()
    document.save(file_stream)
    file_stream.seek(0)

    return file_stream


def add_heading(document, text):
    paragraph = document.add_paragraph()

    run = paragraph.add_run(text)
    run.bold = True
    run.font.size = Pt(12)

    paragraph.paragraph_format.space_before = Pt(12)
    paragraph.paragraph_format.space_after = Pt(5)