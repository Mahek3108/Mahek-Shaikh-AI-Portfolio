import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  Achievements, About, Contact, Engineering, Experience, GithubSection,
  Hero, InsideLab, Navigation, ProductionWorkflow, Projects, Research,
} from '@/components/portfolio-sections';

const queryClient = new QueryClient();

const introLetters = 'MAHEK SHAIKH'.split('');
const introParticles = [
  { x: '12%', y: '22%', delay: '.1s', color: 'purple' },
  { x: '24%', y: '68%', delay: '.8s', color: 'purple' },
  { x: '39%', y: '30%', delay: '1.4s', color: 'red' },
  { x: '57%', y: '74%', delay: '.5s', color: 'purple' },
  { x: '71%', y: '20%', delay: '1.1s', color: 'purple' },
  { x: '84%', y: '58%', delay: '1.8s', color: 'red' },
  { x: '91%', y: '34%', delay: '.3s', color: 'purple' },
];

function CinematicIntro() {
  const [phase, setPhase] = useState<'forming' | 'closing' | 'done'>(() => {
    if (typeof window === 'undefined') return 'forming';
    return window.sessionStorage.getItem('mahek-intro-seen') === '1' ? 'done' : 'forming';
  });

  useEffect(() => {
    if (phase === 'done') return;
    window.sessionStorage.setItem('mahek-intro-seen', '1');
    const closeTimer = window.setTimeout(() => setPhase('closing'), 3800);
    return () => {
      window.clearTimeout(closeTimer);
    };
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={`cinematic-intro ${phase === 'closing' ? 'is-closing' : ''}`} aria-hidden="true">
      <div className="intro-particles">
        {introParticles.map((particle, index) => (
          <span
            className={`intro-particle ${particle.color === 'red' ? 'is-red' : ''}`}
            key={index}
            style={{ '--particle-x': particle.x, '--particle-y': particle.y, '--particle-delay': particle.delay } as CSSProperties}
          />
        ))}
      </div>
      <div className="intro-kicker">AI SYSTEMS LAB / INITIALIZING</div>
      <div className="intro-name">
        {introLetters.map((letter, index) => (
          <span
            className={`intro-letter ${letter === ' ' ? 'is-space' : ''}`}
            key={`${letter}-${index}`}
            style={{ '--letter-index': index, '--letter-offset': `${(index % 3) - 1}` } as CSSProperties}
          >
            {letter === ' ' ? '\u00a0' : letter}
          </span>
        ))}
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="lab-shell min-h-[100dvh]">
      <CinematicIntro />
      <Navigation />
      <main className="site-content">
        <Hero />
        <About />
        <Projects />
        <Research />
        <Experience />
        <Engineering />
        <InsideLab />
        <ProductionWorkflow />
        <Achievements />
        <GithubSection />
        <Contact />
      </main>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;