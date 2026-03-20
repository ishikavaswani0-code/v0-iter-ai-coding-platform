import { generateText } from 'ai'
import { createGroq } from '@ai-sdk/groq'

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

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

export async function POST(req: Request) {
  try {
    const { message, userId, context } = await req.json()

    if (!message || typeof message !== 'string') {
      return Response.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { error: 'GROQ_API_KEY is not configured' },
        { status: 500 }
      )
    }

    const { text } = await generateText({
      model: groq('mixtral-8x7b-32768'),
      system: systemPrompt,
      prompt: message,
      temperature: 0.7,
      maxTokens: 1024,
    })

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
