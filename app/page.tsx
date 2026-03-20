'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { ArrowRight, Code2, Brain, TrendingUp, Zap } from 'lucide-react'

export default function LandingPage() {
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              IterAI
            </span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline">{user.username}</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
                  Master Coding with{' '}
                  <span className="bg-gradient-to-r from-accent via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI-Powered Learning
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Practice coding challenges, execute code in real-time, get AI-powered feedback, and track your progress with IterAI. Your intelligent coding companion for continuous improvement.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={user ? '/dashboard' : '/auth/signup'}>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 w-full sm:w-auto">
                    {user ? 'Go to Dashboard' : 'Start Learning'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="text-accent font-bold text-2xl">500+</div>
                  <div className="text-muted-foreground">Coding Problems</div>
                </div>
                <div className="space-y-2">
                  <div className="text-accent font-bold text-2xl">50k+</div>
                  <div className="text-muted-foreground">Active Learners</div>
                </div>
              </div>
            </div>

            {/* Visual Element - Code Block */}
            <div className="hidden md:flex items-center justify-center">
              <div className="bg-card border border-border rounded-lg p-6 shadow-2xl w-full max-w-md">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-2 font-mono text-sm text-muted-foreground">
                    <div><span className="text-accent">def</span> solve_problem():</div>
                    <div className="ml-4"><span className="text-accent">return</span> excellence</div>
                    <div className="mt-4 text-green-400">✓ Executed successfully</div>
                    <div className="text-accent">Performance: Outstanding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Powerful Features for Growth</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to become a better programmer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Code2 className="w-6 h-6" />,
                title: 'Real-Time Execution',
                description: 'Execute code instantly and see results',
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: 'AI Analysis',
                description: 'Get intelligent feedback on your solutions',
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Progress Tracking',
                description: 'Monitor your growth with detailed stats',
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Smart Strategies',
                description: 'Learn best practices from AI insights',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-background border border-border rounded-lg p-6 hover:border-accent transition-colors"
              >
                <div className="text-accent mb-4">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Level Up Your Coding Skills?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of developers learning smarter, not harder.
            </p>
          </div>
          <Link href={user ? '/dashboard' : '/auth/signup'}>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
              {user ? 'Go to Dashboard' : 'Start Free Today'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div>© 2024 IterAI. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
