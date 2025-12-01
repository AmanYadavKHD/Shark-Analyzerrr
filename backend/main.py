from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from pipelines.audio_analysis import analyze_audio
from pipelines.content_analysis import analyze_content
from pipelines.shark_panel import generate_shark_feedback

app = FastAPI(title="Shark Tank Pitch Analyzer API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Shark Tank Analyzer API is running"}

@app.post("/analyze")
async def analyze_pitch(file: UploadFile = File(...)):
    try:
        # Save file locally
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # 1. Audio Analysis
        audio_results = analyze_audio(file_path)
        
        # 2. Content Analysis
        content_results = analyze_content(file_path)
        
        # 3. Shark Panel
        shark_feedback = generate_shark_feedback(audio_results, content_results)
        
        return {
            "audio_analysis": audio_results,
            "content_analysis": content_results,
            "shark_feedback": shark_feedback
        }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
