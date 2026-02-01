import { Layout } from '@/components/layout/Layout';
import { SpeechAnalyzer } from '@/components/therapy/SpeechAnalyzer';
import { EmotionDetector } from '@/components/therapy/EmotionDetector';
import { AdaptiveEngine } from '@/components/therapy/AdaptiveEngine';
import { useTherapy } from '@/context/TherapyContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TherapySession() {
  const { isSessionActive, endSession } = useTherapy();
  const navigate = useNavigate();
  const [sessionTime, setSessionTime] = useState(0);

  // Session timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    endSession();
    setSessionTime(0);
    navigate('/feedback');
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-64px)] py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Therapy Session
              </h1>
              <p className="text-muted-foreground mt-1">
                Real-time speech analysis with emotion & engagement detection
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Session Timer */}
              {isSessionActive && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono font-semibold">
                    {formatTime(sessionTime)}
                  </span>
                  <Activity className="h-4 w-4 animate-pulse" />
                </div>
              )}
              
              {isSessionActive && (
                <Button
                  variant="outline"
                  onClick={handleEndSession}
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  End Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Speech Analysis */}
            <div className="lg:col-span-1">
              <SpeechAnalyzer />
            </div>

            {/* Middle Column - Emotion Detection */}
            <div className="lg:col-span-1">
              <EmotionDetector />
            </div>

            {/* Right Column - Adaptive Engine */}
            <div className="lg:col-span-1">
              <AdaptiveEngine />
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
            <h3 className="font-semibold text-sm mb-2">Session Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Speak clearly and at a natural pace for best analysis</li>
              <li>• Ensure good lighting for accurate emotion detection</li>
              <li>• The AI adapts in real-time based on your performance and emotional state</li>
              <li>• Take breaks if you feel frustrated - the system will detect this and adjust</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
