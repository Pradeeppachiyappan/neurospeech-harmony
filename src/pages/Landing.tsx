import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Brain,
  Mic,
  Camera,
  Sparkles,
  Globe,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle,
  Play,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Mic,
    title: 'Real-Time Speech Analysis',
    description: 'Advanced speech recognition with instant pronunciation and fluency scoring.',
  },
  {
    icon: Camera,
    title: 'Emotion & Engagement Detection',
    description: 'Camera-based analysis tracks emotional state and focus level during sessions.',
  },
  {
    icon: Brain,
    title: 'Neuro-Adaptive Personalization',
    description: 'AI dynamically adjusts therapy difficulty based on performance and emotional state.',
  },
  {
    icon: Globe,
    title: 'Bilingual Support',
    description: 'Full support for Tamil and English with seamless language switching.',
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Comprehensive dashboards track improvement over time with detailed insights.',
  },
  {
    icon: Shield,
    title: 'Privacy-First Design',
    description: 'All processing is secure and privacy-aware. Your data stays protected.',
  },
];

const roles = [
  {
    title: 'Therapy Participants',
    description: 'Personalized sessions that adapt to your learning style and emotional state.',
  },
  {
    title: 'Caregivers & Parents',
    description: 'Monitor progress and support therapy goals with detailed insights.',
  },
  {
    title: 'Speech Therapists',
    description: 'Professional tools to track patient progress and customize treatment plans.',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 fade-in">
              <Sparkles className="h-4 w-4" />
              AI-Powered Speech Therapy
            </div>
            
            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 slide-up">
              Real-Time Bilingual Speech Therapy{' '}
              <span className="gradient-text">Powered by Neuro-Adaptive AI</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 slide-up" style={{ animationDelay: '0.1s' }}>
              Experience personalized therapy that adapts to your emotions, engagement, 
              and progress in real-time. Supporting Tamil and English speakers.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up" style={{ animationDelay: '0.2s' }}>
              <Button
                size="lg"
                onClick={() => navigate(isAuthenticated ? '/therapy' : '/signup')}
                className="h-14 px-8 text-base rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Therapy
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                className="h-14 px-8 text-base rounded-xl"
              >
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Multimodal Intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform analyzes speech, emotion, and engagement in parallel 
              to deliver truly personalized therapy experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border border-border card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={cn(
                  'h-14 w-14 rounded-xl flex items-center justify-center mb-4',
                  'bg-gradient-to-br from-primary/20 to-accent/20',
                  'group-hover:from-primary/30 group-hover:to-accent/30 transition-all'
                )}>
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Three simple steps to begin your personalized therapy journey.
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Start a Session',
                  description: 'Choose your language (Tamil or English) and begin speaking. Our AI listens and analyzes your speech in real-time.',
                },
                {
                  step: '02',
                  title: 'Emotion & Engagement Analysis',
                  description: 'Your camera captures facial expressions to detect emotional state and engagement level, ensuring therapy adapts to how you feel.',
                },
                {
                  step: '03',
                  title: 'Adaptive Personalization',
                  description: 'The neuro-adaptive engine adjusts difficulty, focus areas, and recommendations based on your combined performance metrics.',
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Everyone */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Designed for Everyone
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're a participant, caregiver, or professional, 
              NeuroSpeak provides the tools you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {role.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary to-accent">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Speech Journey?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Join thousands of users experiencing personalized, AI-powered speech therapy.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="h-14 px-8 text-base rounded-xl bg-card text-foreground hover:bg-card/90"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
