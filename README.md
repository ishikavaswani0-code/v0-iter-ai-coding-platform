# IterAI - AI-Powered Coding Learning Platform

A sophisticated coding practice platform with AI-powered feedback, real-time code execution, and intelligent learning analytics.

## 🚀 Features

### Core Features
- **Landing Page**: Beautiful hero section showcasing the platform
- **Authentication**: Simple mock authentication (upgradeable to database)
- **Dashboard**: Overview of progress, recent challenges, and quick actions
- **Practice Section**: 500+ coding challenges across multiple categories
- **Code Execution**: Real-time code execution via Judge0 API
- **Multiple Languages**: Support for Python, JavaScript, Java, C++, C#, Go, Rust, Swift
- **AI Chatbot**: Groq-powered AI mentor for coding help and guidance
- **Strategies**: Collection of problem-solving techniques and algorithms
- **Mistake Tracking**: Learn from errors with detailed analysis
- **Progress Tracking**: Visual progress charts and achievement system
- **User Profiles**: Comprehensive user statistics and achievements

### Dark Theme
- Deep black background (#0a0a0a)
- Neon purple accents (#a855f7)
- Glassmorphism cards with transparency effects
- Smooth animations and transitions

## 📋 Project Structure

```
app/
├── page.tsx              # Landing page
├── auth/
│   ├── login/page.tsx    # Login page
│   └── signup/page.tsx   # Signup page
├── dashboard/page.tsx    # Dashboard
├── practice/
│   ├── page.tsx          # Practice challenges list
│   └── [id]/page.tsx     # Individual challenge with code editor
├── strategies/page.tsx   # Problem-solving strategies
├── mistakes/page.tsx     # Tracked mistakes analysis
├── progress/page.tsx     # Progress tracking and stats
├── profile/page.tsx      # User profile
├── chatbot/page.tsx      # AI assistant chatbot
├── api/
│   └── chat/route.ts     # AI chatbot API endpoint
├── layout.tsx            # Root layout with auth provider
└── globals.css           # Global styles with dark theme

lib/
├── auth-context.tsx      # Auth state management
├── judge0.ts             # Judge0 code execution API client

components/ui/
└── [shadcn components]   # Pre-built UI components
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

The project uses pnpm as the default package manager:

```bash
pnpm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required for code execution
JUDGE0_API_KEY=your_judge0_api_key_here
NEXT_PUBLIC_JUDGE0_API_KEY=your_judge0_api_key_here

# Required for AI chatbot
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Get API Keys

#### Judge0 API
1. Sign up at [judge0.com](https://judge0.com)
2. Get your API key from the dashboard
3. Judge0 provides code execution for multiple programming languages

#### Groq API
1. Sign up at [console.groq.com](https://console.groq.com)
2. Create an API key
3. Groq provides fast LLM inference for the AI chatbot

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication

The current implementation uses **mock authentication** (in-memory state). This is suitable for MVP/prototype development.

### To Upgrade to Real Authentication:
1. Replace the `AuthProvider` in `lib/auth-context.tsx` with a real auth service (Firebase, Supabase, Auth0, etc.)
2. Add a database to persist user data
3. Implement proper session management with secure cookies

### Demo Credentials:
- Email: `demo@example.com`
- Password: `demo123`

(These work with the mock authentication)

## 🧪 Testing the Features

### 1. Practice Code Execution
1. Sign in to the dashboard
2. Navigate to Practice
3. Select a challenge
4. Write or modify code in the editor
5. Click "Execute" to run code via Judge0

### 2. AI Chatbot
1. Go to Dashboard → AI Assistant
2. Ask the AI chatbot questions about coding:
   - "Explain merge sort"
   - "How to optimize O(n²) to O(n)"
   - "Help me understand recursion"

### 3. Mistake Tracking
1. Navigate to "Tracked Mistakes"
2. View your tracked errors and lessons learned
3. Practice similar problems to avoid repeating mistakes

### 4. Progress Analytics
1. Go to "Progress" page
2. View weekly activity charts
3. Monitor skill distribution
4. Track goals and achievements

## 🎨 Dark Theme Customization

The dark theme uses CSS custom properties (variables) defined in `app/globals.css`:

```css
--background: #0a0a0a    /* Deep black background */
--foreground: #f5f5f5    /* Light text */
--card: #1a1a2e          /* Card backgrounds */
--accent: #a855f7        /* Neon purple */
```

All colors are automatically applied via the `dark` class on the `<html>` element.

## 📦 Key Dependencies

- **Next.js 16**: Full-stack React framework
- **React 19**: UI library
- **Tailwind CSS 4**: Utility-first styling
- **shadcn/ui**: Pre-built accessible components
- **AI SDK 6**: AI integration framework
- **@ai-sdk/groq**: Groq provider for AI SDK
- **Lucide React**: Icon library
- **TypeScript**: Type safety

## 🔄 API Integration

### Judge0 API (Code Execution)
- Endpoint: `https://judge0-ce.p.rapidapi.com`
- Supports 50+ programming languages
- Returns execution output, errors, and performance metrics
- Used by: Practice page code execution

### Groq API (AI Chatbot)
- Endpoint: Groq's API via AI SDK
- Models: mixtral-8x7b-32768 (fast open-source model)
- Used by: Chatbot page AI responses
- Request/response: Plain text messages

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Add environment variables:
   - `JUDGE0_API_KEY`
   - `GROQ_API_KEY`
4. Deploy with one click

### Environment Variables on Vercel
Settings → Environment Variables → Add your API keys

## 📈 Future Enhancements

1. **Database Integration**: Switch from mock auth to real database (Supabase, Neon)
2. **Advanced Analytics**: More detailed progress tracking and insights
3. **Problem Tags**: Filter by tags (e.g., #sliding-window, #dp)
4. **Solution Sharing**: Share solutions with the community
5. **Leaderboards**: Compete with other users
6. **Video Tutorials**: Integrated video explanations for concepts
7. **Code Quality Analysis**: AST-based code quality feedback
8. **Difficulty Recommendation**: AI-powered problem difficulty suggestions
9. **Interview Prep**: Mock interview mode with timed challenges
10. **Mobile App**: Native mobile version with offline support

## 🤝 Contributing

This is a template/starter project. Feel free to:
- Add more challenges and content
- Enhance the UI/UX
- Integrate with additional services
- Deploy and customize for your needs

## 📝 License

MIT License - feel free to use this for personal or commercial projects.

## 🆘 Troubleshooting

### "GROQ_API_KEY is not configured"
- Make sure you've set the `GROQ_API_KEY` environment variable
- Restart the development server after adding the key
- Check that the key is valid in Groq's console

### "Judge0 API request failed"
- Verify `JUDGE0_API_KEY` is set correctly
- Check your Judge0 account and API quota
- Ensure the code execution service is available

### Code execution times out
- Judge0 has time limits per language (usually 1-5 seconds)
- Optimize your code or check for infinite loops
- Use the console output to debug

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Judge0 API Docs](https://ce.judge0.com/)
- [Groq Console](https://console.groq.com)
- [AI SDK Documentation](https://sdk.vercel.ai)

---

**Built with ❤️ using v0 and Vercel**
