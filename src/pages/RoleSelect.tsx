import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth, UserRole } from '@/context/AuthContext';
import { User, Users, Stethoscope, Shield, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const roles: {
  role: UserRole;
  title: string;
  description: string;
  icon: typeof User;
  color: string;
}[] = [
  {
    role: 'participant',
    title: 'Therapy Participant',
    description: 'I am receiving speech therapy and want to practice',
    icon: User,
    color: 'from-primary to-primary/70',
  },
  {
    role: 'caregiver',
    title: 'Caregiver / Parent',
    description: 'I am supporting someone in their therapy journey',
    icon: Users,
    color: 'from-secondary to-secondary/70',
  },
  {
    role: 'therapist',
    title: 'Speech Therapist',
    description: 'I am a professional providing speech therapy services',
    icon: Stethoscope,
    color: 'from-accent to-accent/70',
  },
  {
    role: 'admin',
    title: 'System Administrator',
    description: 'I manage the platform and user access',
    icon: Shield,
    color: 'from-warning to-warning/70',
  },
];

export default function RoleSelect() {
  const navigate = useNavigate();
  const { selectRole, user } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    selectRole(role);
    
    // Navigate to appropriate dashboard
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'therapist':
      case 'caregiver':
        navigate('/caregiver-dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Welcome, {user?.name || 'User'}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Select your role to personalize your experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map(({ role, title, description, icon: Icon, color }) => (
              <button
                key={role}
                onClick={() => handleRoleSelect(role)}
                className={cn(
                  'group relative p-6 rounded-2xl border border-border bg-card text-left',
                  'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
                  'focus:outline-none focus-visible:ring-4 focus-visible:ring-ring'
                )}
              >
                <div
                  className={cn(
                    'h-14 w-14 rounded-xl flex items-center justify-center mb-4',
                    'bg-gradient-to-br',
                    color
                  )}
                >
                  <Icon className="h-7 w-7 text-primary-foreground" />
                </div>
                
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>

                <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
