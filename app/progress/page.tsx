'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { Brain, LogOut, TrendingUp, Calendar, Award, Flame } from 'lucide-react'

interface ProgressData {
  date: string
  problemsSolved: number
  pointsEarned: number
}

export default function ProgressPage() {
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

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Mock data for progress
  const weeklyProgress: ProgressData[] = [
    { date: 'Mon', problemsSolved: 2, pointsEarned: 100 },
    { date: 'Tue', problemsSolved: 3, pointsEarned: 150 },
    { date: 'Wed', problemsSolved: 1, pointsEarned: 50 },
    { date: 'Thu', problemsSolved: 2, pointsEarned: 120 },
    { date: 'Fri', problemsSolved: 3, pointsEarned: 180 },
    { date: 'Sat', problemsSolved: 0, pointsEarned: 0 },
    { date: 'Sun', problemsSolved: 2, pointsEarned: 100 },
  ]

  const totalProblems = weeklyProgress.reduce((sum, day) => sum + day.problemsSolved, 0)
  const totalPoints = weeklyProgress.reduce((sum, day) => sum + day.pointsEarned, 0)
  const currentStreak = 5

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-accent" />
            <span className="text-lg font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              IterAI
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <TrendingUp className="w-10 h-10 text-accent" />
            Your Progress
          </h1>
          <p className="text-muted-foreground">
            Track your learning journey and celebrate your achievements
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            {
              icon: <Award className="w-5 h-5" />,
              label: 'This Week',
              value: totalProblems,
              unit: 'problems',
            },
            {
              icon: <TrendingUp className="w-5 h-5" />,
              label: 'Points Earned',
              value: totalPoints,
              unit: 'pts',
            },
            {
              icon: <Flame className="w-5 h-5" />,
              label: 'Current Streak',
              value: currentStreak,
              unit: 'days',
            },
            {
              icon: <Calendar className="w-5 h-5" />,
              label: 'Total Solved',
              value: user.problemsSolved,
              unit: 'all time',
            },
          ].map((metric, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-accent">{metric.icon}</div>
              </div>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-xs text-muted-foreground">
                {metric.label}
                <div className="text-xs text-muted-foreground opacity-75">{metric.unit}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Activity */}
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8">Weekly Activity</h2>

          <div className="space-y-6">
            {/* Problems Chart */}
            <div>
              <h3 className="font-semibold mb-4">Problems Solved by Day</h3>
              <div className="flex items-end justify-between gap-2 h-40">
                {weeklyProgress.map((day, i) => {
                  const maxProblems = Math.max(...weeklyProgress.map((d) => d.problemsSolved))
                  const height =
                    maxProblems > 0 ? (day.problemsSolved / maxProblems) * 100 : 0

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-secondary rounded-t-lg" style={{ height: `${height}%`, minHeight: '20px' }}>
                        {day.problemsSolved > 0 && (
                          <div className="w-full h-full bg-accent rounded-t-lg opacity-80"></div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">{day.date}</div>
                      <div className="text-xs font-semibold text-accent">{day.problemsSolved}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Points Chart */}
            <div>
              <h3 className="font-semibold mb-4">Points Earned by Day</h3>
              <div className="flex items-end justify-between gap-2 h-40">
                {weeklyProgress.map((day, i) => {
                  const maxPoints = Math.max(...weeklyProgress.map((d) => d.pointsEarned))
                  const height = maxPoints > 0 ? (day.pointsEarned / maxPoints) * 100 : 0

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-secondary rounded-t-lg" style={{ height: `${height}%`, minHeight: '20px' }}>
                        {day.pointsEarned > 0 && (
                          <div className="w-full h-full bg-green-400 rounded-t-lg opacity-80"></div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">{day.date}</div>
                      <div className="text-xs font-semibold text-green-400">{day.pointsEarned}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Time Investment */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-bold mb-6">Skills Distribution</h3>
            <div className="space-y-4">
              {[
                { skill: 'Arrays', percentage: 65 },
                { skill: 'Strings', percentage: 48 },
                { skill: 'Trees', percentage: 35 },
                { skill: 'Dynamic Programming', percentage: 20 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.skill}</span>
                    <span className="text-xs text-accent">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-bold mb-6">Goals</h3>
            <div className="space-y-4">
              {[
                { goal: 'Solve 50 Problems', current: 25, target: 50, unit: 'problems' },
                { goal: 'Reach 2000 Points', current: 1200, target: 2000, unit: 'pts' },
                { goal: 'Master All Topics', current: 4, target: 8, unit: 'topics' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.goal}</span>
                    <span className="text-xs text-accent">
                      {item.current}/{item.target} {item.unit}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${(item.current / item.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-gradient-to-r from-accent/20 to-purple-400/20 border border-accent/30 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-3">Keep up the great work!</h3>
          <p className="text-muted-foreground mb-4">
            You've come a long way! With consistent practice and learning from mistakes, you'll reach your coding goals. Remember, every problem solved is a step forward.
          </p>
          <div className="flex gap-4">
            <Link href="/practice">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Continue Practicing
              </Button>
            </Link>
            <Link href="/chatbot">
              <Button variant="outline">
                Ask for Help
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
