import { generateText as generateTextFn } from 'ai'
import { createGroq } from '@ai-sdk/groq'

const hasAISDK = !!generateTextFn && !!createGroq

const systemPrompt = `You are IterAI, an expert coding mentor. Your role is to:
1. Help users understand coding concepts, algorithms, and data structures
2. Review code and provide constructive feedback
3. Explain complex algorithms in simple terms
4. Provide personalized learning strategies based on user's questions
5. Help prepare for coding interviews
6. Encourage best practices and clean code

When answering:
- Keep responses concise but thorough
- Use examples and code snippets when helpful
- Ask clarifying questions if needed
- Provide step-by-step explanations for complex topics
- Be supportive and encouraging

Current context: The user is practicing coding problems and seeking to improve their skills.`

const mockResponses = [
  "That's a great question! Let me break it down step by step...",
  "Here's an approach: first understand the problem constraints, then think about edge cases...",
  "Consider using a data structure like a hash map to optimize your solution...",
  "Remember to test your solution with different test cases to ensure correctness...",
  "This is a classic problem that can be solved with proper algorithm design. Think about the time and space complexity..."
]

export async function POST(req: Request) {
  try {
    const { message, userId, context } = await req.json()

    if (!message || typeof message !== 'string') {
      return Response.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    let text = ''

    if (hasAISDK && process.env.GROQ_API_KEY) {
      try {
        const groq = createGroq({
          apiKey: process.env.GROQ_API_KEY,
        })

        const result = await generateTextFn({
          model: groq('mixtral-8x7b-32768'),
          system: systemPrompt,
          prompt: message,
          temperature: 0.7,
          maxTokens: 1024,
        })
        text = result
      } catch (aiError) {
        console.warn('Groq API error, using mock response:', aiError)
        text = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      }
    } else {
      text = mockResponses[Math.floor(Math.random() * mockResponses.length)]
    }

    return Response.json({
      message: text,
      userId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
