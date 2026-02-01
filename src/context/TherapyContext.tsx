import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Language = 'english' | 'tamil';
export type EmotionState = 'calm' | 'neutral' | 'frustrated';
export type EngagementLevel = 'focused' | 'distracted';
export type TherapyLevel = 'beginner' | 'intermediate' | 'advanced';
export type FocusArea = 'pronunciation' | 'fluency' | 'conversation';

interface SpeechMetrics {
  pronunciationAccuracy: number;
  fluencyScore: number;
  transcription: string;
}

interface EmotionMetrics {
  emotionState: EmotionState;
  engagementLevel: EngagementLevel;
  engagementScore: number;
  confidence: number;
}

interface AdaptiveDecision {
  therapyLevel: TherapyLevel;
  focusArea: FocusArea;
  confidenceScore: number;
  recommendation: string;
}

interface SessionData {
  id: string;
  startTime: Date;
  duration: number;
  speechMetrics: SpeechMetrics;
  emotionMetrics: EmotionMetrics;
  adaptiveDecision: AdaptiveDecision;
}

interface TherapyContextType {
  isSessionActive: boolean;
  selectedLanguage: Language;
  speechMetrics: SpeechMetrics;
  emotionMetrics: EmotionMetrics;
  adaptiveDecision: AdaptiveDecision;
  sessionHistory: SessionData[];
  setLanguage: (lang: Language) => void;
  startSession: () => void;
  endSession: () => void;
  updateSpeechMetrics: (metrics: Partial<SpeechMetrics>) => void;
  updateEmotionMetrics: (metrics: Partial<EmotionMetrics>) => void;
}

const defaultSpeechMetrics: SpeechMetrics = {
  pronunciationAccuracy: 0,
  fluencyScore: 0,
  transcription: '',
};

const defaultEmotionMetrics: EmotionMetrics = {
  emotionState: 'neutral',
  engagementLevel: 'focused',
  engagementScore: 75,
  confidence: 0,
};

const defaultAdaptiveDecision: AdaptiveDecision = {
  therapyLevel: 'beginner',
  focusArea: 'pronunciation',
  confidenceScore: 0,
  recommendation: 'Start with basic pronunciation exercises',
};

const TherapyContext = createContext<TherapyContextType | undefined>(undefined);

// Neuro-Adaptive Decision Engine
function calculateAdaptiveDecision(
  speech: SpeechMetrics,
  emotion: EmotionMetrics
): AdaptiveDecision {
  // Normalize metrics (0-1 scale)
  const pronNorm = speech.pronunciationAccuracy / 100;
  const fluencyNorm = speech.fluencyScore / 100;
  const engagementNorm = emotion.engagementScore / 100;
  
  // Emotion weight factors
  const emotionWeight = emotion.emotionState === 'frustrated' ? 0.5 : 
                        emotion.emotionState === 'calm' ? 1.2 : 1.0;
  const engagementWeight = emotion.engagementLevel === 'distracted' ? 0.6 : 1.0;
  
  // Weighted composite score
  const compositeScore = (
    (pronNorm * 0.3 + fluencyNorm * 0.3 + engagementNorm * 0.4) *
    emotionWeight * engagementWeight
  );
  
  // Determine therapy level
  let therapyLevel: TherapyLevel = 'beginner';
  if (compositeScore > 0.7) therapyLevel = 'advanced';
  else if (compositeScore > 0.4) therapyLevel = 'intermediate';
  
  // Determine focus area
  let focusArea: FocusArea = 'pronunciation';
  if (pronNorm > fluencyNorm && pronNorm > 0.6) {
    focusArea = fluencyNorm > 0.6 ? 'conversation' : 'fluency';
  } else if (pronNorm < 0.5) {
    focusArea = 'pronunciation';
  }
  
  // Generate recommendation
  let recommendation = '';
  if (emotion.emotionState === 'frustrated' || emotion.engagementLevel === 'distracted') {
    recommendation = 'Take a short break. Consider simpler, more engaging exercises.';
  } else if (compositeScore > 0.7) {
    recommendation = 'Great progress! Ready for advanced conversational practice.';
  } else if (compositeScore > 0.4) {
    recommendation = `Focus on improving ${focusArea} with moderate difficulty exercises.`;
  } else {
    recommendation = 'Continue with foundational exercises. Practice makes perfect!';
  }
  
  return {
    therapyLevel,
    focusArea,
    confidenceScore: Math.round(compositeScore * 100),
    recommendation,
  };
}

export function TherapyProvider({ children }: { children: ReactNode }) {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [speechMetrics, setSpeechMetrics] = useState<SpeechMetrics>(defaultSpeechMetrics);
  const [emotionMetrics, setEmotionMetrics] = useState<EmotionMetrics>(defaultEmotionMetrics);
  const [adaptiveDecision, setAdaptiveDecision] = useState<AdaptiveDecision>(defaultAdaptiveDecision);
  const [sessionHistory, setSessionHistory] = useState<SessionData[]>([]);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  const setLanguage = useCallback((lang: Language) => {
    setSelectedLanguage(lang);
  }, []);

  const startSession = useCallback(() => {
    setIsSessionActive(true);
    setSessionStartTime(new Date());
    setSpeechMetrics(defaultSpeechMetrics);
    setEmotionMetrics(defaultEmotionMetrics);
  }, []);

  const endSession = useCallback(() => {
    if (sessionStartTime) {
      const sessionData: SessionData = {
        id: Date.now().toString(),
        startTime: sessionStartTime,
        duration: (Date.now() - sessionStartTime.getTime()) / 1000,
        speechMetrics,
        emotionMetrics,
        adaptiveDecision,
      };
      setSessionHistory(prev => [...prev, sessionData]);
    }
    setIsSessionActive(false);
    setSessionStartTime(null);
  }, [sessionStartTime, speechMetrics, emotionMetrics, adaptiveDecision]);

  const updateSpeechMetrics = useCallback((metrics: Partial<SpeechMetrics>) => {
    setSpeechMetrics(prev => {
      const updated = { ...prev, ...metrics };
      const newDecision = calculateAdaptiveDecision(updated, emotionMetrics);
      setAdaptiveDecision(newDecision);
      return updated;
    });
  }, [emotionMetrics]);

  const updateEmotionMetrics = useCallback((metrics: Partial<EmotionMetrics>) => {
    setEmotionMetrics(prev => {
      const updated = { ...prev, ...metrics };
      const newDecision = calculateAdaptiveDecision(speechMetrics, updated);
      setAdaptiveDecision(newDecision);
      return updated;
    });
  }, [speechMetrics]);

  return (
    <TherapyContext.Provider
      value={{
        isSessionActive,
        selectedLanguage,
        speechMetrics,
        emotionMetrics,
        adaptiveDecision,
        sessionHistory,
        setLanguage,
        startSession,
        endSession,
        updateSpeechMetrics,
        updateEmotionMetrics,
      }}
    >
      {children}
    </TherapyContext.Provider>
  );
}

export function useTherapy() {
  const context = useContext(TherapyContext);
  if (context === undefined) {
    throw new Error('useTherapy must be used within a TherapyProvider');
  }
  return context;
}
