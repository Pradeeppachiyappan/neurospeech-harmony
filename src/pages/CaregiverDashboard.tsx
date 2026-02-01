import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProgressChart, EmotionChart, EngagementTrendChart } from '@/components/dashboard/Charts';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock,
  User,
  ChevronRight,
  Download,
  FileText
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Mock patients/participants data
const patients = [
  { id: 1, name: 'Arun Kumar', age: 8, sessions: 24, avgScore: 78, lastSession: '2 hours ago', trend: 12 },
  { id: 2, name: 'Priya S.', age: 12, sessions: 18, avgScore: 85, lastSession: 'Yesterday', trend: 8 },
  { id: 3, name: 'Vikram R.', age: 6, sessions: 32, avgScore: 72, lastSession: '3 days ago', trend: -3 },
];

export default function CaregiverDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isTherapist = user?.role === 'therapist';

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                {isTherapist ? 'Patient' : 'Care'} Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor and support therapy progress
              </p>
            </div>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Reports
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title={isTherapist ? 'Active Patients' : 'Participants'}
              value={patients.length}
              subtitle="Currently monitoring"
              icon={Users}
              variant="primary"
            />
            <StatCard
              title="Total Sessions"
              value={74}
              subtitle="This month"
              icon={Calendar}
              variant="secondary"
            />
            <StatCard
              title="Avg. Improvement"
              value="+12%"
              subtitle="Across all patients"
              icon={TrendingUp}
              variant="success"
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Session Time"
              value="28h"
              subtitle="Total this month"
              icon={Clock}
              variant="warning"
            />
          </div>

          {/* Patients/Participants List */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">
                {isTherapist ? 'Patients' : 'Participants'}
              </h3>
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b border-border">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Sessions</th>
                    <th className="pb-3 font-medium">Avg. Score</th>
                    <th className="pb-3 font-medium">Trend</th>
                    <th className="pb-3 font-medium">Last Session</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="border-b border-border/50 last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {patient.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">Age {patient.age}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-medium">{patient.sessions}</td>
                      <td className="py-4">
                        <span className={`font-medium ${
                          patient.avgScore >= 80 ? 'text-success' : 
                          patient.avgScore >= 60 ? 'text-warning' : 'text-destructive'
                        }`}>
                          {patient.avgScore}%
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`flex items-center gap-1 text-sm font-medium ${
                          patient.trend >= 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {patient.trend >= 0 ? '↑' : '↓'} {Math.abs(patient.trend)}%
                        </span>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {patient.lastSession}
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgressChart />
            <EmotionChart />
          </div>
        </div>
      </div>
    </Layout>
  );
}
