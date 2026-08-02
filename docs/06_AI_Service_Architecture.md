# AI Service Architecture

The AI Service is built using FastAPI.

## Responsibilities

- Resume Analysis
- ATS Matching
- Resume Tailoring
- Bullet Rewriting
- Cover Letter Generation

---

## Existing Modules

- analyzer.py
- prompts.py
- utils.py
- config.py
- logger_config.py

---

## AI Workflow

Resume

↓

Extract Text

↓

Prompt Generation

↓

Gemini API

↓

JSON Response

↓

Return Analysis