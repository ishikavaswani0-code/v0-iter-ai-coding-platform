'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { Brain, LogOut, Lightbulb, BookOpen, Target } from 'lucide-react'

interface Strategy {
  id: string
  title: string
  category: string
  difficulty: string
  description: string
  tips: string[]
}

export default function StrategiesPage() {
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

  const strategies: Strategy[] = [
    {
      id: '1',
      title: 'Two Pointer Technique',
      category: 'Array',
      difficulty: 'Medium',
      description: 'Use two pointers moving towards each other to solve array problems efficiently',
      tips: [
        'Works well for sorted arrays',
        'Reduces time complexity from O(n²) to O(n)',
        'Common in problems: Two Sum, Container With Most Water',
        'One pointer starts from beginning, other from end',
      ],
    },
    {
      id: '2',
      title: 'Sliding Window',
      category: 'String',
      difficulty: 'Medium',
      description: 'Maintain a window of elements and slide it across the data structure',
      tips: [
        'Best for substring/subarray problems',
        'Track character frequencies or sums in window',
        'Expand window to include more elements',
        'Contract window when condition is met',
      ],
    },
    {
      id: '3',
      title: 'Dynamic Programming',
      category: 'Algorithm',
      difficulty: 'Hard',
      description: 'Break problems into overlapping subproblems and store results',
      tips: [
        'Identify optimal substructure',
        'Use memoization to store intermediate results',
        'Define recurrence relation clearly',
        'Start with recursive solution, then optimize',
      ],
    },
    {
      id: '4',
      title: 'Binary Search',
      category: 'Search',
      difficulty: 'Medium',
      description: 'Efficiently search in sorted data by dividing search space in half',
      tips: [
        'Requires sorted array or dataset',
        'O(log n) time complexity',
        'Be careful with boundary conditions',
        'Practice mid calculation: mid = left + (right - left) / 2',
      ],
    },
    {
      id: '5',
      title: 'Graph Traversal (BFS/DFS)',
      category: 'Graph',
      difficulty: 'Hard',
      description: 'Explore all nodes and edges in a graph systematically',
      tips: [
        'BFS for shortest path in unweighted graphs',
        'DFS for exploring all paths and cycles',
        'Use queue for BFS, stack for DFS',
        'Track visited nodes to avoid cycles',
      ],
    },
    {
      id: '6',
      title: 'Hash Map/Set Usage',
      category: 'Data Structure',
      difficulty: 'Easy',
      description: 'Use hash maps to count occurrences and hash sets for uniqueness',
      tips: [
        'O(1) average lookup time',
        'Great for "find" and "count" problems',
        'Use hash set to remove duplicates',
        'Hash map for frequency counting',
      ],
    },
  ]

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
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Lightbulb className="w-10 h-10 text-accent" />
            Problem-Solving Strategies
          </h1>
          <p className="text-muted-foreground">
            Learn proven techniques to solve coding problems efficiently
          </p>
        </div>

        {/* Strategies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{strategy.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                      {strategy.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      strategy.difficulty === 'Easy' ? 'text-green-400 bg-green-400/10' :
                      strategy.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-400/10' :
                      'text-red-400 bg-red-400/10'
                    }`}>
                      {strategy.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </div>

                <div className="space-y-2 border-t border-border pt-4">
                  <h4 className="font-semibold text-sm">Key Tips:</h4>
                  <ul className="space-y-1">
                    {strategy.tips.slice(0, 3).map((tip, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-accent">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resource Section */}
        <div className="mt-16 bg-card border border-border rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-accent text-2xl">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold">Solve Problems</h3>
              <p className="text-sm text-muted-foreground">
                Practice these strategies with real coding challenges
              </p>
              <Link href="/practice">
                <Button variant="outline" size="sm">
                  Start Practicing
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              <div className="text-accent text-2xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold">Learn Patterns</h3>
              <p className="text-sm text-muted-foreground">
                Understand common patterns used in coding interviews
              </p>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </div>

            <div className="space-y-3">
              <div className="text-accent text-2xl">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-bold">AI Insights</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized strategies based on your performance
              </p>
              <Link href="/chatbot">
                <Button variant="outline" size="sm">
                  Ask AI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
