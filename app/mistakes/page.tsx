'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { Brain, LogOut, AlertCircle, BookOpen } from 'lucide-react'

interface Mistake {
  id: string
  challenge: string
  category: string
  mistakeType: string
  description: string
  lesson: string
  date: string
}

export default function MistakesPage() {
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

  const mistakes: Mistake[] = [
    {
      id: '1',
      challenge: 'Two Sum',
      category: 'Array',
      mistakeType: 'Logic Error',
      description: 'Failed to handle duplicate elements in array',
      lesson: 'Always consider edge cases like duplicates, empty arrays, and single elements',
      date: '2024-03-15',
    },
    {
      id: '2',
      challenge: 'Longest Substring',
      category: 'String',
      mistakeType: 'Algorithm Choice',
      description: 'Used nested loops (O(n²)) instead of sliding window (O(n))',
      lesson: 'Sliding window is perfect for substring/subarray problems with constraints',
      date: '2024-03-14',
    },
    {
      id: '3',
      challenge: 'Add Two Numbers',
      category: 'Linked List',
      mistakeType: 'Implementation Bug',
      description: 'Forgot to handle carry-over to next node correctly',
      lesson: 'When dealing with carries, always track and propagate them properly',
      date: '2024-03-13',
    },
  ]

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const mistakeTypeColor = (type: string) => {
    switch (type) {
      case 'Logic Error':
        return 'text-red-400 bg-red-400/10'
      case 'Algorithm Choice':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'Implementation Bug':
        return 'text-orange-400 bg-orange-400/10'
      default:
        return 'text-blue-400 bg-blue-400/10'
    }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <AlertCircle className="w-10 h-10 text-accent" />
            Tracked Mistakes
          </h1>
          <p className="text-muted-foreground">
            Learn from your errors to avoid repeating them
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-3xl font-bold text-accent mb-1">{mistakes.length}</div>
            <div className="text-sm text-muted-foreground">Total Mistakes Tracked</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-1">2</div>
            <div className="text-sm text-muted-foreground">Weak Categories</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-3xl font-bold text-green-400 mb-1">1</div>
            <div className="text-sm text-muted-foreground">Improvement This Week</div>
          </div>
        </div>

        {/* Mistakes List */}
        <div className="space-y-6">
          {mistakes.map((mistake) => (
            <div
              key={mistake.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{mistake.challenge}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                        {mistake.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${mistakeTypeColor(mistake.mistakeType)}`}>
                        {mistake.mistakeType}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(mistake.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">What Went Wrong</h4>
                    <p className="text-sm text-muted-foreground">{mistake.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-accent" />
                      Key Lesson
                    </h4>
                    <p className="text-sm text-muted-foreground">{mistake.lesson}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <Link href={`/practice/1`}>
                    <Button variant="outline" size="sm">
                      Practice Similar Problems
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resources */}
        <div className="mt-12 bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">How to Avoid These Mistakes</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-accent font-bold min-w-fit">1.</span>
              <span className="text-muted-foreground">Always write test cases including edge cases (empty, single element, duplicates)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold min-w-fit">2.</span>
              <span className="text-muted-foreground">Plan your algorithm before coding - consider time/space complexity</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold min-w-fit">3.</span>
              <span className="text-muted-foreground">Review your code line by line for logic errors</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold min-w-fit">4.</span>
              <span className="text-muted-foreground">Learn from mistakes - understand why it failed, not just the fix</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
