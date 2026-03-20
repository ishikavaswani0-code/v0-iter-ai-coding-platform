# IterAI - Quick Setup Guide

Get IterAI running in 5 minutes!

## Step 1: Install Dependencies
```bash
pnpm install
```

## Step 2: Set Up Environment Variables

Create `.env.local` in the root directory:

```env
# Judge0 API Key (for code execution)
JUDGE0_API_KEY=your_key_here
NEXT_PUBLIC_JUDGE0_API_KEY=your_key_here

# Groq API Key (for AI chatbot)
GROQ_API_KEY=your_key_here
```

## Step 3: Get Your API Keys

### Judge0 API Key
1. Visit [judge0.com](https://judge0.com)
2. Sign up for a free account
3. Go to your dashboard and copy your API key
4. Add it to `.env.local`

### Groq API Key
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Create an API key
4. Add it to `.env.local`

## Step 4: Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## Step 5: Login & Explore

### Demo Credentials:
- Email: `demo@example.com`
- Password: `demo123`

Or sign up with any credentials to create a new account.

## What to Try

### 1. Practice Coding
- Dashboard → Practice → Select a challenge
- Write code and click "Execute" to run it
- Get real-time feedback

### 2. Talk to AI
- Dashboard → AI Assistant
- Ask questions about coding
- Try: "Explain merge sort" or "How to optimize algorithms"

### 3. Track Progress
- Navigate through Dashboard, Progress, and Profile pages
- See your stats, achievements, and learning analytics

### 4. Learn Strategies
- Go to Strategies page
- Learn problem-solving techniques
- Master algorithms and patterns

## Features at a Glance

✅ **Real-time Code Execution** - Run code in 8+ languages
✅ **AI Chatbot** - Get instant coding help
✅ **500+ Challenges** - Practice across all difficulty levels
✅ **Progress Tracking** - Visual analytics of your journey
✅ **Dark Theme** - Beautiful, modern interface
✅ **Responsive** - Works on desktop and mobile
✅ **No Database Required** - Starts with mock auth (upgrade anytime)

## Next Steps

1. **Explore all pages** - Navigate through each section
2. **Test code execution** - Try different programming languages
3. **Customize** - Edit challenges, add more content, change colors
4. **Deploy** - Push to GitHub and deploy to Vercel with one click

## Common Issues & Solutions

### "GROQ_API_KEY is not configured"
→ Check that you've added the key to `.env.local` and restarted the dev server

### Code execution fails
→ Verify `JUDGE0_API_KEY` is correct and your quota hasn't been exceeded

### Styles look wrong
→ Clear browser cache (Ctrl+Shift+Delete) and refresh

## Need Help?

Check the full [README.md](./README.md) for:
- Detailed feature descriptions
- API integration guide
- Deployment instructions
- Troubleshooting section

---

**You're all set! Happy coding! 🚀**
