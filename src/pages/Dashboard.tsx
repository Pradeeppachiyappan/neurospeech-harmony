import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProgressChart, EmotionChart, SessionChart, EngagementTrendChart } from '@/components/dashboard/Charts';
import { useAuth } from '@/context/AuthContext';
import { useTherapy } from '@/context/TherapyContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  Target, 
  TrendingUp, 
  Smile, 
  Calendar,
  ChevronRight
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { sessionHistory } = useTherapy();
  const navigate = useNavigate();

  // Mock data for display
  const totalSessions = sessionHistory.length || 12;
  const totalMinutes = sessionHistory.reduce((acc, s) => acc + s.duration, 0) || 180;
  const avgScore = 76;
  const streak = 5;

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's your therapy progress overview
              </p>
            </div>
            
            <Button onClick={() => navigate('/therapy')} size="lg">
              <Play className="mr-2 h-5 w-5" />
              Start Session
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Sessions"
              value={totalSessions}
              subtitle="This month"
              icon={Calendar}
              variant="primary"
              trend={{ value: 15, isPositive: true }}
            />
            <StatCard
              title="Practice Time"
              value={`${Math.round(totalMinutes / 60)}h ${totalMinutes % 60}m`}
              subtitle="Total this month"
              icon={Clock}
              variant="secondary"
            />
            <StatCard
              title="Average Score"
              value={`${avgScore}%`}
              subtitle="Across all metrics"
              icon={Target}
              variant="success"
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Current Streak"
              value={`${streak} days`}
              subtitle="Keep it going!"
              icon={TrendingUp}
              variant="warning"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ProgressChart />
            <EngagementTrendChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SessionChart />
            <EmotionChart />
          </div>

          {/* Recent Sessions */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Recent Sessions</h3>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {[
                { date: 'Today', duration: '18 min', score: 82, emotion: 'calm' },
                { date: 'Yesterday', duration: '22 min', score: 78, emotion: 'neutral' },
                { date: '2 days ago', duration: '15 min', score: 75, emotion: 'focused' },
              ].map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Smile className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{session.date}</div>
                      <div className="text-sm text-muted-foreground">{session.duration}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-success">{session.score}%</div>
                    <div className="text-xs text-muted-foreground capitalize">{session.emotion}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
