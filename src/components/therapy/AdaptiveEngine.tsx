import { useTherapy } from '@/context/TherapyContext';
import { Brain, Target, TrendingUp, Lightbulb, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const levelColors = {
  beginner: 'from-success to-success/70',
  intermediate: 'from-warning to-warning/70',
  advanced: 'from-accent to-accent/70',
};

const levelIcons = {
  beginner: '🌱',
  intermediate: '🌿',
  advanced: '🌳',
};

const focusIcons = {
  pronunciation: '🗣️',
  fluency: '🌊',
  conversation: '💬',
};

export function AdaptiveEngine() {
  const { isSessionActive, speechMetrics, emotionMetrics, adaptiveDecision } = useTherapy();

  // Calculate input metrics for display
  const inputMetrics = [
    { label: 'Pronunciation', value: speechMetrics.pronunciationAccuracy, color: 'bg-primary' },
    { label: 'Fluency', value: speechMetrics.fluencyScore, color: 'bg-accent' },
    { label: 'Engagement', value: emotionMetrics.engagementScore, color: 'bg-success' },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={cn(
          'h-12 w-12 rounded-xl flex items-center justify-center',
          'bg-gradient-to-br from-primary to-accent'
        )}>
          <Brain className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold">Neuro-Adaptive Engine</h3>
          <p className="text-sm text-muted-foreground">
            Real-time therapy personalization
          </p>
        </div>
        {isSessionActive && (
          <div className="ml-auto flex items-center gap-2">
            <Zap className="h-4 w-4 text-warning animate-pulse" />
            <span className="text-xs text-warning font-medium">Active</span>
          </div>
        )}
      </div>

      {/* Input Metrics */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Target className="h-4 w-4" />
          Input Metrics
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {inputMetrics.map((metric) => (
            <div
              key={metric.label}
              className="text-center p-3 rounded-xl bg-muted/50 border border-border"
            >
              <div className="text-2xl font-bold text-foreground">
                {Math.round(metric.value)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
              <div className="h-1 bg-muted rounded-full mt-2 overflow-hidden">
                <div
                  className={cn('h-full rounded-full', metric.color)}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emotion Context */}
      <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Emotional Context Applied
        </h4>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">State:</span>
            <span className={cn(
              'px-2 py-0.5 rounded text-xs font-medium',
              emotionMetrics.emotionState === 'calm' && 'bg-emotion-calm text-primary-foreground',
              emotionMetrics.emotionState === 'neutral' && 'bg-emotion-neutral text-primary-foreground',
              emotionMetrics.emotionState === 'frustrated' && 'bg-emotion-frustrated text-primary-foreground'
            )}>
              {emotionMetrics.emotionState}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Focus:</span>
            <span className={cn(
              'px-2 py-0.5 rounded text-xs font-medium',
              emotionMetrics.engagementLevel === 'focused' && 'bg-emotion-focused text-primary-foreground',
              emotionMetrics.engagementLevel === 'distracted' && 'bg-emotion-distracted text-primary-foreground'
            )}>
              {emotionMetrics.engagementLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Adaptive Decision Output */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">
          Adaptive Decision
        </h4>

        {/* Therapy Level */}
        <div className={cn(
          'p-4 rounded-xl bg-gradient-to-r text-primary-foreground',
          levelColors[adaptiveDecision.therapyLevel]
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{levelIcons[adaptiveDecision.therapyLevel]}</span>
              <div>
                <div className="text-xs opacity-80">Recommended Level</div>
                <div className="font-semibold capitalize">
                  {adaptiveDecision.therapyLevel}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-80">Confidence</div>
              <div className="text-2xl font-bold">
                {adaptiveDecision.confidenceScore}%
              </div>
            </div>
          </div>
        </div>

        {/* Focus Area */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{focusIcons[adaptiveDecision.focusArea]}</span>
            <div>
              <div className="text-xs text-muted-foreground">Focus Area</div>
              <div className="font-semibold capitalize">
                {adaptiveDecision.focusArea}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <div className="text-xs text-primary font-medium mb-1">
                AI Recommendation
              </div>
              <p className="text-sm text-foreground">
                {adaptiveDecision.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
