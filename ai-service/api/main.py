from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from api.routes import analyze, ats, rewrite, upload
from api.middleware.errorhandler import (
    handle_runtime_error,
    handle_value_error,
    handle_generic_exception,
)
from api.models.response import HealthResponse
from config import APP_VERSION
from logger_config import get_logger

logger = get_logger(__name__)

app = FastAPI(
    title="AI Resume Analyzer API", 
    description=(
        "## AI-Powered Resume Analysis\n\n"
        "REST API built with Google Gemini.\n\n"
        "### Features\n"
        "- Resume Analysis\n"
        "- ATS Matching\n"
        "- Resume Bullet Rewriter\n"
    ),
    version=APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# ---------------- CORS ---------------- #

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8501",
        "http://127.0.0.1:8501",
        "http://localhost:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------- Exception Handlers ------------- #

app.add_exception_handler(RuntimeError, handle_runtime_error)
app.add_exception_handler(ValueError, handle_value_error)
app.add_exception_handler(Exception, handle_generic_exception)

# ---------------- Routes ---------------- #

app.include_router(analyze.router)
app.include_router(ats.router)
app.include_router(rewrite.router)
app.include_router(upload.router)

# ---------------- Health ---------------- #

@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["System"],
)
async def health_check():
    return HealthResponse(
        status="healthy",
        version=APP_VERSION,
        message="AI Resume Analyzer API is running successfully.",
    )

# ---------------- Root ---------------- #

@app.get("/", include_in_schema=False)
async def root():
    return JSONResponse(
        {
            "message": "AI Resume Analyzer API",
            "docs": "http://localhost:8000/docs",
            "health": "http://localhost:8000/health",
            "version": APP_VERSION,
        }
    )

# ---------------- Startup ---------------- #

@app.on_event("startup")
async def startup():
    logger.info(f"AI Resume Analyzer API v{APP_VERSION} started")

# ---------------- Shutdown ---------------- #

@app.on_event("shutdown")
async def shutdown():
    logger.info("AI Resume Analyzer API shutting down")