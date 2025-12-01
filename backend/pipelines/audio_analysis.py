import librosa
import numpy as np
import os

def analyze_audio(file_path: str):
    try:
        # Load audio
        y, sr = librosa.load(file_path, sr=None)
        
        # 1. Pitch Analysis (Fundamental Frequency)
        f0, voiced_flag, voiced_probs = librosa.pyin(y, fmin=librosa.note_to_hz('C2'), fmax=librosa.note_to_hz('C7'))
        f0 = f0[~np.isnan(f0)] # Remove NaNs
        avg_pitch = np.mean(f0) if len(f0) > 0 else 0
        pitch_variability = np.std(f0) if len(f0) > 0 else 0
        
        # 2. Volume/Energy Analysis (RMS)
        rms = librosa.feature.rms(y=y)[0]
        avg_volume = np.mean(rms)
        volume_variability = np.std(rms)
        
        # 3. Pace/Tempo
        onset_env = librosa.onset.onset_strength(y=y, sr=sr)
        tempo = librosa.beat.tempo(onset_envelope=onset_env, sr=sr)
        avg_tempo = tempo[0] if len(tempo) > 0 else 0
        
        # 4. Pauses (Silence Detection)
        # Split at silence (below 20db for at least 500ms)
        non_silent_intervals = librosa.effects.split(y, top_db=20, frame_length=2048, hop_length=512)
        total_duration = librosa.get_duration(y=y, sr=sr)
        non_silent_duration = sum([(end - start) / sr for start, end in non_silent_intervals])
        pause_duration = total_duration - non_silent_duration
        pause_ratio = pause_duration / total_duration if total_duration > 0 else 0
        
        # 5. Scoring Logic (Heuristic)
        # Pitch Score: Higher variability is better (less monotone)
        pitch_score = min(100, max(0, int(pitch_variability * 2))) 
        
        # Energy Score: Higher average volume and variability is better
        energy_score = min(100, max(0, int(avg_volume * 500 + volume_variability * 500)))
        
        # Pace Score: Ideal is around 120-150 BPM? Or just not too slow/fast. 
        # Let's just normalize tempo.
        pace_score = min(100, max(0, int(100 - abs(avg_tempo - 120))))
        
        # Clarity/Confidence (Composite)
        confidence_score = int((pitch_score + energy_score + pace_score) / 3)
        
        # Emotion Detection (Heuristic based on features)
        emotions = {}
        if pitch_variability > 20 and volume_variability > 0.05:
            emotions["Excitement"] = "High"
        elif pitch_variability < 10:
            emotions["Monotony"] = "High"
        else:
            emotions["Neutral"] = "High"

        return {
            "pitch_score": pitch_score,
            "pace_score": pace_score,
            "volume_score": energy_score, # Using energy as volume score
            "clarity_score": confidence_score, # Proxy
            "energy_score": energy_score,
            "confidence_score": confidence_score,
            "emotions": emotions,
            "hesitations": 0, # Placeholder, needs ASR alignment
            "metrics": {
                "avg_pitch": float(avg_pitch),
                "avg_tempo": float(avg_tempo),
                "pause_ratio": float(pause_ratio)
            }
        }
    except Exception as e:
        print(f"Error in audio analysis: {e}")
        return {
            "error": str(e)
        }
