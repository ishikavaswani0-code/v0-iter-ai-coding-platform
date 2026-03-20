// Judge0 API client for code execution
// https://judge0.com/

const JUDGE0_BASE_URL = 'https://judge0-ce.p.rapidapi.com'

interface ExecutionRequest {
  sourceCode: string
  languageId: number // 1=C, 5=C++, 7=C#, 31=Go, 33=Java, 34=Kotlin, 35=Lua, 40=Objective-C, 44=Python, 46=Rust, 50=Swift, etc.
  stdin?: string
  timeLimit?: number
  memoryLimit?: number
}

interface ExecutionResult {
  token: string
  status: {
    id: number
    description: string
  }
  stdout?: string
  stderr?: string
  compile_output?: string
  time?: string
  memory?: string
  exit_code?: number
}

export const languageOptions = [
  { id: 44, name: 'Python', ext: '.py' },
  { id: 34, name: 'JavaScript', ext: '.js' },
  { id: 33, name: 'Java', ext: '.java' },
  { id: 5, name: 'C++', ext: '.cpp' },
  { id: 7, name: 'C#', ext: '.cs' },
  { id: 31, name: 'Go', ext: '.go' },
  { id: 46, name: 'Rust', ext: '.rs' },
  { id: 50, name: 'Swift', ext: '.swift' },
]

export async function submitCode(request: ExecutionRequest): Promise<{ token: string }> {
  const apiKey = process.env.NEXT_PUBLIC_JUDGE0_API_KEY || process.env.JUDGE0_API_KEY

  if (!apiKey) {
    throw new Error('Judge0 API key not configured')
  }

  const response = await fetch(`${JUDGE0_BASE_URL}/submissions?base64_encoded=false&fields=*`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
    body: JSON.stringify({
      language_id: request.languageId,
      source_code: request.sourceCode,
      stdin: request.stdin || '',
    }),
  })

  if (!response.ok) {
    throw new Error(`Judge0 submission failed: ${response.statusText}`)
  }

  const data = await response.json()
  return { token: data.token }
}

export async function getExecutionResult(token: string): Promise<ExecutionResult> {
  const apiKey = process.env.NEXT_PUBLIC_JUDGE0_API_KEY || process.env.JUDGE0_API_KEY

  if (!apiKey) {
    throw new Error('Judge0 API key not configured')
  }

  const response = await fetch(
    `${JUDGE0_BASE_URL}/submissions/${token}?base64_encoded=false&fields=*`,
    {
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch execution result: ${response.statusText}`)
  }

  return response.json()
}

// Poll for execution result with retries
export async function executeCode(request: ExecutionRequest): Promise<ExecutionResult> {
  const { token } = await submitCode(request)

  // Poll for result
  let attempts = 0
  const maxAttempts = 30

  while (attempts < maxAttempts) {
    const result = await getExecutionResult(token)

    if (result.status.id > 2) {
      // Status > 2 means execution is complete
      return result
    }

    attempts++
    // Wait 500ms before retrying
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error('Code execution timeout')
}
