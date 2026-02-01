import { useEffect, useRef, useState, useCallback } from 'react';
import { useTherapy, EmotionState, EngagementLevel } from '@/context/TherapyContext';
import { Camera, CameraOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaceDetectionResult {
  emotionState: EmotionState;
  engagementLevel: EngagementLevel;
  engagementScore: number;
  confidence: number;
  faceDetected: boolean;
}

// Mock emotion detection - simulates ML analysis
function analyzeFace(): FaceDetectionResult {
  const emotions: EmotionState[] = ['calm', 'neutral', 'frustrated'];
  const engagements: EngagementLevel[] = ['focused', 'distracted'];
  
  // Weighted random to favor positive states
  const emotionWeights = [0.45, 0.40, 0.15];
  const engagementWeights = [0.7, 0.3];
  
  let emotionRand = Math.random();
  let engagementRand = Math.random();
  
  let emotionIndex = 0;
  let cumulative = 0;
  for (let i = 0; i < emotionWeights.length; i++) {
    cumulative += emotionWeights[i];
    if (emotionRand < cumulative) {
      emotionIndex = i;
      break;
    }
  }
  
  const engagementIndex = engagementRand < engagementWeights[0] ? 0 : 1;
  const baseScore = engagementIndex === 0 ? 70 : 40;
  
  return {
    emotionState: emotions[emotionIndex],
    engagementLevel: engagements[engagementIndex],
    engagementScore: baseScore + Math.random() * 25,
    confidence: 0.75 + Math.random() * 0.2,
    faceDetected: Math.random() > 0.05,
  };
}

const emotionColors: Record<EmotionState, string> = {
  calm: 'bg-emotion-calm',
  neutral: 'bg-emotion-neutral',
  frustrated: 'bg-emotion-frustrated',
};

const emotionLabels: Record<EmotionState, string> = {
  calm: '😊 Calm',
  neutral: '😐 Neutral',
  frustrated: '😤 Frustrated',
};

const engagementColors: Record<EngagementLevel, string> = {
  focused: 'bg-emotion-focused',
  distracted: 'bg-emotion-distracted',
};

export function EmotionDetector() {
  const { isSessionActive, emotionMetrics, updateEmotionMetrics } = useTherapy();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Start camera
  useEffect(() => {
    if (!isSessionActive) return;

    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 640, height: 480 },
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
          setCameraError(null);
        }
      } catch (err) {
        console.error('Camera error:', err);
        setCameraError('Unable to access camera. Please check permissions.');
        setHasCamera(false);
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isSessionActive]);

  // Emotion analysis loop
  useEffect(() => {
    if (!isSessionActive || !hasCamera) return;

    setIsAnalyzing(true);
    
    const interval = setInterval(() => {
      const result = analyzeFace();
      
      if (result.faceDetected) {
        updateEmotionMetrics({
          emotionState: result.emotionState,
          engagementLevel: result.engagementLevel,
          engagementScore: result.engagementScore,
          confidence: result.confidence,
        });
      }
    }, 1500);

    return () => {
      clearInterval(interval);
      setIsAnalyzing(false);
    };
  }, [isSessionActive, hasCamera, updateEmotionMetrics]);

  if (!isSessionActive) {
    return (
      <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]">
        <CameraOff className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center">
          Camera will activate when session starts
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Video Feed */}
      <div className="relative aspect-video bg-muted">
        {cameraError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-sm text-muted-foreground text-center">{cameraError}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
            
            {/* Overlay indicators */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-primary-foreground',
                emotionColors[emotionMetrics.emotionState]
              )}>
                {emotionLabels[emotionMetrics.emotionState]}
              </div>
            </div>
            
            {isAnalyzing && (
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-primary-foreground bg-foreground/30 backdrop-blur px-2 py-1 rounded">
                  Analyzing
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Metrics Panel */}
      <div className="p-4 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />
          Emotion & Engagement Analysis
        </h3>

        {/* Emotion State */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Emotional State</span>
            <span className={cn(
              'font-medium px-2 py-0.5 rounded text-xs',
              emotionColors[emotionMetrics.emotionState],
              'text-primary-foreground'
            )}>
              {emotionMetrics.emotionState.charAt(0).toUpperCase() + emotionMetrics.emotionState.slice(1)}
            </span>
          </div>
        </div>

        {/* Engagement Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Engagement Level</span>
            <span className="font-medium">{Math.round(emotionMetrics.engagementScore)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                engagementColors[emotionMetrics.engagementLevel]
              )}
              style={{ width: `${emotionMetrics.engagementScore}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Distracted</span>
            <span className={cn(
              'font-medium',
              emotionMetrics.engagementLevel === 'focused' ? 'text-emotion-focused' : 'text-emotion-distracted'
            )}>
              {emotionMetrics.engagementLevel === 'focused' ? '🎯 Focused' : '💭 Distracted'}
            </span>
            <span>Focused</span>
          </div>
        </div>

        {/* Confidence */}
        <div className="flex justify-between text-sm pt-2 border-t border-border">
          <span className="text-muted-foreground">Detection Confidence</span>
          <span className="font-medium">{Math.round(emotionMetrics.confidence * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
