'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { Brain, LogOut, Code2, TrendingUp, BookOpen, MessageSquare, Settings } from 'lucide-react'

interface Challenge {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  solved: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const challenges: Challenge[] = [
    { id: '1', title: 'Two Sum', difficulty: 'Easy', category: 'Array', solved: true },
    { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', category: 'Linked List', solved: false },
    { id: '3', title: 'Longest Substring', difficulty: 'Medium', category: 'String', solved: false },
    { id: '4', title: 'Regular Expression Matching', difficulty: 'Hard', category: 'Dynamic Programming', solved: false },
  ]

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400'
      case 'Medium':
        return 'text-yellow-400'
      case 'Hard':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-accent" />
            <span className="text-lg font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              IterAI
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                {user.username}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.username}!</h1>
          <p className="text-muted-foreground">Keep pushing your limits. Every problem solved brings you closer to mastery.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Problems Solved', value: user.problemsSolved, icon: <Code2 className="w-5 h-5" /> },
            { label: 'Total Points', value: user.totalPoints, icon: <TrendingUp className="w-5 h-5" /> },
            { label: 'Mistakes Tracked', value: user.mistakesTracked, icon: <BookOpen className="w-5 h-5" /> },
            { label: 'Weak Topics', value: user.weakTopics.length, icon: <MessageSquare className="w-5 h-5" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-accent">{stat.icon}</div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Challenges Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Practice Challenges</h2>
              <Link href="/practice">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {challenges.map((challenge) => (
                <Link key={challenge.id} href={`/practice/${challenge.id}`}>
                  <div className="bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground">{challenge.category}</p>
                      </div>
                      <div className="flex items-center gap-4 ml-4">
                        <span className={`text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        {challenge.solved && (
                          <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/practice">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground justify-start gap-3">
                  <Code2 className="w-4 h-4" />
                  Start Practice
                </Button>
              </Link>
              <Link href="/strategies">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <TrendingUp className="w-4 h-4" />
                  View Strategies
                </Button>
              </Link>
              <Link href="/mistakes">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <BookOpen className="w-4 h-4" />
                  Review Mistakes
                </Button>
              </Link>
              <Link href="/chatbot">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <MessageSquare className="w-4 h-4" />
                  AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">This Week's Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Problems Solved</span>
                <span className="text-sm text-accent">3/10</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Points Earned</span>
                <span className="text-sm text-accent">150/500</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
