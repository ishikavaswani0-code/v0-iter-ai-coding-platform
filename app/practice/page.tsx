'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { Brain, LogOut, ChevronRight } from 'lucide-react'

interface Challenge {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  description: string
  solved: boolean
}

export default function PracticePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (!user) {
    return router.push('/auth/login')
  }

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Array',
      description: 'Find two numbers that add up to a target value',
      solved: true,
    },
    {
      id: '2',
      title: 'Add Two Numbers',
      difficulty: 'Medium',
      category: 'Linked List',
      description: 'Add two numbers represented as linked lists',
      solved: false,
    },
    {
      id: '3',
      title: 'Longest Substring',
      difficulty: 'Medium',
      category: 'String',
      description: 'Find the longest substring without repeating characters',
      solved: false,
    },
    {
      id: '4',
      title: 'Regular Expression Matching',
      difficulty: 'Hard',
      category: 'Dynamic Programming',
      description: 'Implement regex pattern matching',
      solved: false,
    },
    {
      id: '5',
      title: 'Container With Most Water',
      difficulty: 'Medium',
      category: 'Array',
      description: 'Find the maximum area between two lines',
      solved: false,
    },
    {
      id: '6',
      title: 'Binary Tree Level Order',
      difficulty: 'Medium',
      category: 'Tree',
      description: 'Traverse a binary tree level by level',
      solved: false,
    },
  ]

  const categories = Array.from(new Set(challenges.map((c) => c.category)))
  const filteredChallenges = selectedCategory
    ? challenges.filter((c) => c.category === selectedCategory)
    : challenges

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400 bg-green-400/10'
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'Hard':
        return 'text-red-400 bg-red-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Challenges</h1>
          <p className="text-muted-foreground">
            Solve {filteredChallenges.length} challenges and improve your coding skills
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-card border border-border hover:border-accent'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card border border-border hover:border-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <Link key={challenge.id} href={`/practice/${challenge.id}`}>
              <div className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors cursor-pointer h-full">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.category}</p>
                    </div>
                    {challenge.solved && (
                      <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
