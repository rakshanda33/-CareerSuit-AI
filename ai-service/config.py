# config.py
import os
from dotenv import load_dotenv

load_dotenv()

# ── Gemini ────────────────────────────────────────────
GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL: str = "gemini-2.5-flash"

# Lower temperature = more consistent structured JSON
TEMPERATURE: float = 0.2

# Disable hidden reasoning for faster resume/ATS generation
THINKING_BUDGET: int = 0

# Enough for Resume Analysis, Job Match and Resume Tailor
MAX_TOKENS: int = 2500

# ── PDF ───────────────────────────────────────────────
MAX_PDF_PAGES: int = 10
MIN_RESUME_CHARS: int = 100

# ── App ───────────────────────────────────────────────
APP_TITLE: str = "AI Resume Analyzer"
APP_ICON: str = "📄"
APP_VERSION: str = "2.0.0"

# ── API ───────────────────────────────────────────────
API_HOST: str = "0.0.0.0"
API_PORT: int = 8000
API_BASE_URL: str = os.getenv(
    "API_BASE_URL",
    "http://localhost:8000"
)