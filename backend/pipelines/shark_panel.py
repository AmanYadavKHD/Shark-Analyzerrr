import google.generativeai as genai
import os
import json

def generate_shark_feedback(audio_results, content_results):
    try:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return [{"shark": "System", "feedback": "GEMINI_API_KEY missing.", "decision": "Error"}]
            
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-pro')
        
        transcript = content_results.get("transcript", "")
        business_score = content_results.get("overall_business_score", 0)
        clarity_score = audio_results.get("clarity_score", 0)
        
        prompt = f"""
        You are a panel of Shark Tank investors. Analyze this pitch based on the following data:
        Transcript: "{transcript}"
        Business Score: {business_score}/100
        Vocal Clarity/Confidence: {clarity_score}/100
        
        Generate feedback from 3 distinct personas:
        1. The Visionary (Focuses on big picture, market potential, innovation. Optimistic but demanding.)
        2. The Finance Shark (Focuses on numbers, margins, sales, valuation. Brutally honest.)
        3. The Skeptic (Focuses on risks, competition, reasons to fail. Hard to impress.)
        
        For each shark, provide:
        - "shark": Name of persona
        - "feedback": A 2-3 sentence quote in their voice.
        - "decision": "Invest", "Not Invest", or "Need More Info"
        
        Return the result as a JSON list of objects.
        """
        
        response = model.generate_content(prompt)
        try:
            text = response.text.replace("```json", "").replace("```", "").strip()
            feedback = json.loads(text)
        except:
            feedback = [{"shark": "Error", "feedback": "Failed to parse shark feedback.", "decision": "Error"}]
            
        return feedback

    except Exception as e:
        print(f"Error in shark panel: {e}")
        return [{"shark": "Error", "feedback": str(e), "decision": "Error"}]
