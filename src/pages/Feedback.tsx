import { Layout } from '@/components/layout/Layout';
import { useTherapy } from '@/context/TherapyContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Trophy, 
  Target, 
  Brain, 
  TrendingUp,
  Smile,
  Activity,
  RotateCcw,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Feedback() {
  const { speechMetrics, emotionMetrics, adaptiveDecision, sessionHistory } = useTherapy();
  const navigate = useNavigate();

  const lastSession = sessionHistory[sessionHistory.length - 1];
  
  // Calculate overall score
  const overallScore = Math.round(
    (speechMetrics.pronunciationAccuracy + 
     speechMetrics.fluencyScore + 
     emotionMetrics.engagementScore) / 3
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-success to-success/70';
    if (score >= 60) return 'from-warning to-warning/70';
    return 'from-destructive to-destructive/70';
  };

  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
              <Trophy className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Session Complete!
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's a summary of your therapy session performance
            </p>
          </div>

          {/* Overall Score Card */}
          <div className={cn(
            'p-8 rounded-3xl bg-gradient-to-br text-primary-foreground text-center mb-8',
            getScoreBg(overallScore)
          )}>
            <div className="text-6xl font-bold mb-2">{overallScore}%</div>
            <div className="text-lg opacity-90">Overall Performance Score</div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Pronunciation */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">Pronunciation</div>
              </div>
              <div className={cn('text-3xl font-bold', getScoreColor(speechMetrics.pronunciationAccuracy))}>
                {Math.round(speechMetrics.pronunciationAccuracy)}%
              </div>
              <div className="h-2 bg-muted rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${speechMetrics.pronunciationAccuracy}%` }}
                />
              </div>
            </div>

            {/* Fluency */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div className="text-sm text-muted-foreground">Fluency</div>
              </div>
              <div className={cn('text-3xl font-bold', getScoreColor(speechMetrics.fluencyScore))}>
                {Math.round(speechMetrics.fluencyScore)}%
              </div>
              <div className="h-2 bg-muted rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${speechMetrics.fluencyScore}%` }}
                />
              </div>
            </div>

            {/* Engagement */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-success" />
                </div>
                <div className="text-sm text-muted-foreground">Engagement</div>
              </div>
              <div className={cn('text-3xl font-bold', getScoreColor(emotionMetrics.engagementScore))}>
                {Math.round(emotionMetrics.engagementScore)}%
              </div>
              <div className="h-2 bg-muted rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-success rounded-full"
                  style={{ width: `${emotionMetrics.engagementScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Emotion & Recommendation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Emotion Summary */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Smile className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Emotional State During Session</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Primary State</span>
                  <span className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium capitalize',
                    emotionMetrics.emotionState === 'calm' && 'bg-emotion-calm text-primary-foreground',
                    emotionMetrics.emotionState === 'neutral' && 'bg-emotion-neutral text-primary-foreground',
                    emotionMetrics.emotionState === 'frustrated' && 'bg-emotion-frustrated text-primary-foreground'
                  )}>
                    {emotionMetrics.emotionState}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Focus Level</span>
                  <span className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium capitalize',
                    emotionMetrics.engagementLevel === 'focused' && 'bg-emotion-focused text-primary-foreground',
                    emotionMetrics.engagementLevel === 'distracted' && 'bg-emotion-distracted text-primary-foreground'
                  )}>
                    {emotionMetrics.engagementLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Next Session Recommendation</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Recommended Level</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary capitalize">
                    {adaptiveDecision.therapyLevel}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Focus Area</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent capitalize">
                    {adaptiveDecision.focusArea}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Improvement Suggestions */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <h3 className="font-semibold mb-4">Personalized Suggestions</h3>
            <p className="text-muted-foreground mb-4">
              {adaptiveDecision.recommendation}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {speechMetrics.pronunciationAccuracy < 70 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Practice vowel sounds and consonant clusters for clearer pronunciation
                </li>
              )}
              {speechMetrics.fluencyScore < 70 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Try reading aloud passages to improve speech flow and rhythm
                </li>
              )}
              {emotionMetrics.engagementScore < 70 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Consider shorter, more focused sessions to maintain engagement
                </li>
              )}
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Consistency is key - aim for daily practice sessions
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/therapy')}
              className="h-12 px-6"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Start New Session
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="h-12 px-6"
            >
              View Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
