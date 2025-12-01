import whisper
import google.generativeai as genai
import os
import json

# Load Whisper model (small model for speed/accuracy balance)
# Note: This might download the model on first run
try:
    model = whisper.load_model("base")
except Exception as e:
    print(f"Warning: Could not load Whisper model: {e}")
    model = None

def analyze_content(file_path: str):
    try:
        # 1. Transcription
        if model:
            result = model.transcribe(file_path)
            transcript = result["text"]
        else:
            transcript = "Error: Whisper model not loaded."

        # 2. Business Logic Analysis (using Gemini)
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return {
                "transcript": transcript,
                "error": "GEMINI_API_KEY not found in environment variables."
            }
        
        genai.configure(api_key=api_key)
        gemini_model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""
        Analyze the following pitch transcript for business viability.
        Transcript: "{transcript}"
        
        Evaluate the following criteria on a scale of 0-100 and provide a brief justification:
        1. Problem Clarity
        2. Product Differentiation
        3. Business Model Strength
        4. Market Opportunity
        
        Also identify the pitch structure (Hook, Problem, Solution, Ask).
        
        Return the result as a JSON object with keys: 
        "problem_clarity", "product_differentiation", "business_model", "market_opportunity", "pitch_structure" (list of strings found), "overall_business_score" (average).
        """
        
        response = gemini_model.generate_content(prompt)
        try:
            # Clean up JSON if needed (Gemini sometimes adds markdown)
            text = response.text.replace("```json", "").replace("```", "").strip()
            analysis = json.loads(text)
        except:
            analysis = {"error": "Failed to parse Gemini response"}

        return {
            "transcript": transcript,
            **analysis
        }

    except Exception as e:
        print(f"Error in content analysis: {e}")
        return {
            "error": str(e)
        }
