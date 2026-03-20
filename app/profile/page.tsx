'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { Brain, LogOut, Award, Target, TrendingUp, BookOpen } from 'lucide-react'

export default function ProfilePage() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center">
              <span className="text-4xl font-bold text-accent-foreground">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{user.username}</h1>
              <p className="text-muted-foreground mb-4">{user.email}</p>
              <div className="flex items-center gap-2 text-sm text-accent">
                <Award className="w-4 h-4" />
                <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            {
              icon: <Target className="w-6 h-6" />,
              label: 'Problems Solved',
              value: user.problemsSolved,
              color: 'text-accent',
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              label: 'Total Points',
              value: user.totalPoints,
              color: 'text-green-400',
            },
            {
              icon: <BookOpen className="w-6 h-6" />,
              label: 'Mistakes Tracked',
              value: user.mistakesTracked,
              color: 'text-yellow-400',
            },
            {
              icon: <Award className="w-6 h-6" />,
              label: 'Weak Topics',
              value: user.weakTopics.length,
              color: 'text-purple-400',
            },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Achievement Section */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Achievements</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '🎯', name: 'First Steps', desc: 'Solve your first problem' },
              { icon: '⚡', name: 'Speed Demon', desc: 'Solve 5 problems in a day' },
              { icon: '🏆', name: 'Champion', desc: 'Reach 1000 points' },
              { icon: '🔥', name: 'On Fire', desc: '7-day streak' },
              { icon: '💡', name: 'Problem Solver', desc: 'Solve 50 problems' },
              { icon: '🌟', name: 'Master', desc: 'Complete all hard problems' },
            ].map((badge, i) => (
              <div
                key={i}
                className={`bg-secondary rounded-lg p-4 text-center ${
                  i < 2 ? 'border border-accent/50' : 'opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">Problems by Difficulty</h3>
            <div className="space-y-3">
              {[
                { level: 'Easy', count: 15, color: 'bg-green-400' },
                { level: 'Medium', count: 8, color: 'bg-yellow-400' },
                { level: 'Hard', count: 2, color: 'bg-red-400' },
              ].map((diff, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{diff.level}</span>
                    <span className="text-sm text-accent">{diff.count}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`${diff.color} h-2 rounded-full`}
                      style={{ width: `${(diff.count / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">Problems by Category</h3>
            <div className="space-y-3">
              {[
                { category: 'Array', count: 12 },
                { category: 'String', count: 8 },
                { category: 'Tree', count: 5 },
              ].map((cat, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{cat.category}</span>
                    <span className="text-sm text-accent">{cat.count}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${(cat.count / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link href="/dashboard" className="flex-1">
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Back to Dashboard
            </Button>
          </Link>
          <Button variant="outline" className="flex-1">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
