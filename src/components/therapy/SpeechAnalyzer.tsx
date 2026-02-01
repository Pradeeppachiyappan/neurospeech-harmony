import { useEffect, useRef, useState, useCallback } from 'react';
import { useTherapy, Language } from '@/context/TherapyContext';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock transcription phrases for demonstration
const mockPhrases = {
  english: [
    'Hello, how are you today?',
    'The quick brown fox jumps over the lazy dog.',
    'Practice makes perfect.',
    'Can you say that again please?',
    'I am learning to speak clearly.',
  ],
  tamil: [
    'வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?',
    'நான் தமிழ் பேச கற்றுக்கொள்கிறேன்.',
    'இது மிகவும் நல்ல பயிற்சி.',
    'தயவுசெய்து மீண்டும் சொல்லுங்கள்.',
    'நான் தெளிவாக பேச கற்றுக்கொள்கிறேன்.',
  ],
};

export function SpeechAnalyzer() {
  const { 
    isSessionActive, 
    selectedLanguage, 
    speechMetrics, 
    setLanguage,
    updateSpeechMetrics,
    startSession,
    endSession
  } = useTherapy();
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number>();

  // Start audio monitoring
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      
      const updateLevel = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average / 255);
        }
        animationRef.current = requestAnimationFrame(updateLevel);
      };
      
      updateLevel();
      setIsRecording(true);
      
      if (!isSessionActive) {
        startSession();
      }
      
      // Mock speech analysis updates
      const analysisInterval = setInterval(() => {
        if (isRecording) {
          const phrases = mockPhrases[selectedLanguage];
          const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
          
          updateSpeechMetrics({
            transcription: randomPhrase,
            pronunciationAccuracy: 60 + Math.random() * 35,
            fluencyScore: 55 + Math.random() * 40,
          });
        }
      }, 3000);
      
      return () => clearInterval(analysisInterval);
    } catch (err) {
      console.error('Microphone error:', err);
    }
  }, [isSessionActive, selectedLanguage, startSession, updateSpeechMetrics, isRecording]);

  const stopRecording = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    setIsRecording(false);
    setAudioLevel(0);
    endSession();
  }, [endSession]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-primary" />
          Speech Analysis
        </h3>
        
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-muted-foreground" />
          <Select
            value={selectedLanguage}
            onValueChange={(value: Language) => setLanguage(value)}
            disabled={isRecording}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="tamil">Tamil</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Recording Button */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={cn(
            'relative h-24 w-24 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring',
            isRecording
              ? 'bg-destructive hover:bg-destructive/90 animate-pulse-ring'
              : 'bg-primary hover:bg-primary/90'
          )}
        >
          {/* Audio level ring */}
          {isRecording && (
            <div
              className="absolute inset-0 rounded-full border-4 border-destructive/50"
              style={{
                transform: `scale(${1 + audioLevel * 0.3})`,
                opacity: 0.5 + audioLevel * 0.5,
              }}
            />
          )}
          
          <div className="relative z-10 flex items-center justify-center h-full">
            {isRecording ? (
              <MicOff className="h-10 w-10 text-destructive-foreground" />
            ) : (
              <Mic className="h-10 w-10 text-primary-foreground" />
            )}
          </div>
        </button>
        
        <p className="text-sm text-muted-foreground">
          {isRecording ? 'Tap to stop recording' : 'Tap to start speaking'}
        </p>
      </div>

      {/* Audio Level Visualizer */}
      {isRecording && (
        <div className="flex items-center justify-center gap-1 h-12">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-primary rounded-full transition-all duration-100"
              style={{
                height: `${Math.max(8, (Math.sin(Date.now() / 100 + i) + 1) * audioLevel * 24)}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Live Transcription */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Live Transcription
        </label>
        <div className="min-h-[80px] p-4 rounded-xl bg-muted/50 border border-border">
          {speechMetrics.transcription ? (
            <p className="text-foreground">{speechMetrics.transcription}</p>
          ) : (
            <p className="text-muted-foreground italic">
              {isRecording ? 'Listening...' : 'Start speaking to see transcription'}
            </p>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Pronunciation Accuracy */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pronunciation</span>
            <span className="font-semibold text-primary">
              {Math.round(speechMetrics.pronunciationAccuracy)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${speechMetrics.pronunciationAccuracy}%` }}
            />
          </div>
        </div>

        {/* Fluency Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fluency</span>
            <span className="font-semibold text-accent">
              {Math.round(speechMetrics.fluencyScore)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${speechMetrics.fluencyScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
