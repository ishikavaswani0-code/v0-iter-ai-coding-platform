'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { Brain, LogOut, Play, Copy, Check } from 'lucide-react'
import { languageOptions } from '@/lib/judge0'

// Mock executeCode function since this is a client component
const executeCode = async (request: any) => {
  return {
    status: { id: 3, description: 'Accepted' },
    stdout: 'Output: [0, 1]\nExecution time: 0.123s',
    stderr: '',
    time: '0.123',
  }
}

interface TestCase {
  input: string
  expectedOutput: string
}

interface Challenge {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  description: string
  longDescription: string
  examples: TestCase[]
  constraints: string[]
  boilerplate: string
  defaultLanguage: number
}

export default function PracticeChallengePageContent() {
  const router = useRouter()
  const params = useParams()
  const { user, logout } = useAuth()
  const challengeId = params.id as string

  const [code, setCode] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<number>(44) // Python default
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionOutput, setExecutionOutput] = useState<string>('')
  const [executionError, setExecutionError] = useState<string>('')
  const [executionTime, setExecutionTime] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const challenges: Record<string, Challenge> = {
    '1': {
      id: '1',
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Array',
      description: 'Find two numbers that add up to a target',
      longDescription: 'Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input has exactly one solution, and you cannot use the same element twice.',
      examples: [
        { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
        { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' },
      ],
      constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
      boilerplate: `def twoSum(nums, target):
    # Your solution here
    pass

# Test
nums = [2, 7, 11, 15]
target = 9
print(twoSum(nums, target))`,
      defaultLanguage: 44,
    },
    '2': {
      id: '2',
      title: 'Add Two Numbers',
      difficulty: 'Medium',
      category: 'Linked List',
      description: 'Add two numbers represented as linked lists',
      longDescription: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
      examples: [
        { input: 'l1 = [2,4,3], l2 = [5,6,4]', expectedOutput: '[7,0,8]' },
        { input: 'l1 = [0], l2 = [0]', expectedOutput: '[0]' },
      ],
      constraints: ['The number of nodes in each linked list is in the range [1, 100]', '0 <= Node.val <= 9'],
      boilerplate: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    # Your solution here
    pass`,
      defaultLanguage: 44,
    },
  }

  const challenge = challenges[challengeId] || challenges['1']

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
    setCode(challenge.boilerplate)
    setSelectedLanguage(challenge.defaultLanguage)
  }, [user, router, challenge])

  if (!user) {
    return null
  }

  const handleExecute = async () => {
    setIsExecuting(true)
    setExecutionOutput('')
    setExecutionError('')
    setExecutionTime('')

    try {
      const result = await executeCode({
        sourceCode: code,
        languageId: selectedLanguage,
      })

      if (result.status.id === 3) {
        // Success
        setExecutionOutput(result.stdout || '')
      } else if (result.status.id === 4) {
        // Wrong answer
        setExecutionError('Wrong Answer')
      } else if (result.status.id === 5) {
        // Time limit exceeded
        setExecutionError('Time Limit Exceeded')
      } else if (result.status.id === 6) {
        // Compilation error
        setExecutionError(result.compile_output || 'Compilation Error')
      } else {
        setExecutionError(result.stderr || result.status.description)
      }

      if (result.time) {
        setExecutionTime(result.time)
      }
    } catch (error) {
      setExecutionError(error instanceof Error ? error.message : 'Execution failed')
    } finally {
      setIsExecuting(false)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const currentLanguage = languageOptions.find((l) => l.id === selectedLanguage)?.name || 'Python'

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/practice" className="flex items-center gap-2">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Problem Statement */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold px-3 py-1 rounded ${
                      challenge.difficulty === 'Easy' ? 'text-green-400 bg-green-400/10' :
                      challenge.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-400/10' :
                      'text-red-400 bg-red-400/10'
                    }`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-sm text-muted-foreground">{challenge.category}</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{challenge.description}</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-3">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{challenge.longDescription}</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-4">Examples</h3>
              <div className="space-y-4">
                {challenge.examples.map((example, i) => (
                  <div key={i} className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Input: </span>
                      <span className="font-mono text-accent">{example.input}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Output: </span>
                      <span className="font-mono text-green-400">{example.expectedOutput}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-3">Constraints</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {challenge.constraints.map((constraint, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(Number(e.target.value))}
                  className="bg-secondary border border-border rounded px-3 py-1 text-sm"
                >
                  {languageOptions.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-80 bg-secondary border border-border rounded-lg p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your code here..."
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                >
                  <Play className="w-4 h-4" />
                  {isExecuting ? 'Executing...' : 'Execute'}
                </Button>
                <Button
                  onClick={handleCopyCode}
                  variant="outline"
                  className="gap-2"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Output */}
            {(executionOutput || executionError || executionTime) && (
              <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                <h3 className="font-bold text-sm">Output</h3>
                {executionTime && (
                  <div className="text-xs text-muted-foreground">
                    <span className="text-accent">Execution Time: </span>{executionTime}s
                  </div>
                )}
                {executionOutput && (
                  <div className="bg-secondary rounded p-3 font-mono text-sm text-green-400 max-h-40 overflow-y-auto">
                    {executionOutput}
                  </div>
                )}
                {executionError && (
                  <div className="bg-secondary rounded p-3 font-mono text-sm text-red-400 max-h-40 overflow-y-auto">
                    {executionError}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Wrapper component to handle params properly
export default function PracticeChallengePageWrapper() {
  return <PracticeChallengePageContent />
}
