from fastapi import FastAPI

app = FastAPI(
    title="CareerSuit AI API",
    version="3.0.0",
    description="AI-powered Resume Analysis Service"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to CareerSuit AI",
        "status": "Running"
    }