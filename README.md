# Shark Tank Pitch Analyzer - Setup & Run Instructions

## Prerequisites
- Node.js & npm
- Python 3.8+
- FFmpeg (required for audio processing with `librosa` and `pydub`)
- Google Gemini API Key

## Setup

### 1. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
```

Create a virtual environment and install dependencies:
```bash
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/` and add your Gemini API Key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

### 2. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

## Running the Application

### Start the Backend
In the `backend` terminal:
```bash
.\venv\Scripts\uvicorn main:app --reload
```
The API will run at `http://localhost:8000`.

### Start the Frontend
In the `frontend` terminal:
```bash
npm run dev
```
The App will run at `http://localhost:3000`.

## Usage
1. Open `http://localhost:3000`.
2. Upload a pitch video or audio file.
3. Wait for the analysis (this may take a minute depending on file size).
4. View your scores and Shark feedback on the dashboard!
