# IterAI - Routes & Navigation Guide

Complete guide to all routes and pages in the IterAI application.

## 📍 Public Routes

These pages are accessible without authentication.

### `/`
**Landing Page**
- Hero section with platform overview
- Feature showcase
- Call-to-action buttons (Sign Up / Get Started)
- Stats highlight (500+ challenges, 50k+ learners)
- Footer with links

### `/auth/login`
**Login Page**
- Email input
- Password input
- Sign in button
- Demo credentials section
- Link to signup page

### `/auth/signup`
**Signup Page**
- Username input
- Email input
- Password input
- Form validation
- Sign up button
- Link to login page

---

## 🔐 Protected Routes

These pages require authentication. Users are redirected to `/auth/login` if not authenticated.

### `/dashboard`
**Main Dashboard**
- Welcome message with user name
- Stats grid (4 key metrics)
- Recent challenges list
- Quick action buttons
- Weekly progress bars
- **Requires Auth**: Yes
- **Role**: Authenticated users

### `/practice`
**Practice Challenges List**
- Filter by category (All, Array, String, Tree, etc.)
- Challenge cards with:
  - Title and description
  - Difficulty level (Easy/Medium/Hard)
  - Completion status indicator
  - Category tag
- Responsive grid layout
- **Requires Auth**: Yes

### `/practice/[id]`
**Individual Challenge Page**
- **Left Panel** (Problem Statement):
  - Challenge title and difficulty
  - Full description
  - Example test cases
  - Constraints list
  
- **Right Panel** (Code Editor):
  - Language selector
  - Code editor textarea
  - Execute button
  - Copy code button
  - Output panel with results
  
- Supports languages: Python, JavaScript, Java, C++, C#, Go, Rust, Swift
- **Requires Auth**: Yes
- **Example URLs**:
  - `/practice/1` (Two Sum)
  - `/practice/2` (Add Two Numbers)
  - `/practice/3` (Longest Substring)

### `/strategies`
**Problem-Solving Strategies**
- Collection of 6 coding strategies
- Each strategy includes:
  - Title and category
  - Difficulty level
  - Description
  - Key tips (3-4 tips per strategy)
- Strategies covered:
  - Two Pointer Technique
  - Sliding Window
  - Dynamic Programming
  - Binary Search
  - Graph Traversal (BFS/DFS)
  - Hash Map/Set Usage
- Quick action buttons for practicing and asking AI
- **Requires Auth**: Yes

### `/mistakes`
**Tracked Mistakes & Analysis**
- Stats section (total mistakes, weak categories, improvements)
- List of tracked mistakes with:
  - Challenge name
  - Mistake type (Logic Error, Algorithm Choice, Implementation Bug)
  - Description of what went wrong
  - Key lesson learned
  - Link to practice similar problems
- Recommendations for avoiding common mistakes
- **Requires Auth**: Yes

### `/progress`
**Progress Tracking & Analytics**
- Key metrics (weekly problems, points, streak, total)
- Weekly activity section:
  - Bar chart of problems solved per day
  - Bar chart of points earned per day
- Skills distribution progress bars
- Personal goals tracking
- Motivation section with action buttons
- **Requires Auth**: Yes

### `/profile`
**User Profile & Achievements**
- Profile header with:
  - User avatar (initials)
  - Username and email
  - Member since date
  
- Statistics grid:
  - Problems solved
  - Total points
  - Mistakes tracked
  - Weak topics count

- Achievements section (6 total badges)
- Difficulty distribution (Easy/Medium/Hard)
- Category distribution (Array/String/Tree)
- Edit profile button
- **Requires Auth**: Yes

### `/chatbot`
**AI Coding Mentor**
- Chat interface with:
  - User messages (right-aligned, purple background)
  - AI assistant messages (left-aligned, card background)
  - Timestamps for each message
  - Loading indicator while AI is thinking

- Features:
  - Initial greeting message
  - Suggested prompts for first-time users
  - Real-time message input
  - Send button
  - Auto-scrolling to latest message

- Chat suggestions (visible on first load):
  - "Explain merge sort"
  - "How to optimize O(n²) to O(n)"
  - "Best practice for code interviews"
  - "Help me understand recursion"

- **Requires Auth**: Yes
- **Backend**: `/api/chat` (POST)

---

## 🔌 API Routes

### `POST /api/chat`
**AI Chatbot API Endpoint**

Request body:
```json
{
  "message": "Explain merge sort",
  "userId": "user-123",
  "context": "coding"
}
```

Response:
```json
{
  "message": "Merge sort is a divide-and-conquer algorithm...",
  "userId": "user-123",
  "timestamp": "2024-03-20T10:30:00Z"
}
```

Features:
- Powered by Groq AI
- Streaming responses
- Context-aware coding mentor
- Error handling with user-friendly messages

---

## 🧭 Navigation Structure

```
IterAI
│
├── Landing Page (/)
│   ├── Sign In → /auth/login
│   └── Get Started → /auth/signup
│
├── Authentication
│   ├── /auth/login
│   │   └── Sign Up → /auth/signup
│   └── /auth/signup
│       └── Sign In → /auth/login
│
└── Protected Dashboard (/dashboard)
    ├── Dashboard → /dashboard
    ├── Practice → /practice
    │   └── Challenge [id] → /practice/1, /practice/2, etc.
    ├── Strategies → /strategies
    ├── Mistakes → /mistakes
    ├── Progress → /progress
    ├── Profile → /profile
    └── Chatbot → /chatbot
```

---

## 🔄 User Journey

### First-Time User
1. `/` → Landing page
2. Click "Get Started"
3. `/auth/signup` → Create account
4. `/dashboard` → Main dashboard (redirects after auth)
5. Explore all features

### Returning User
1. `/` → Landing page
2. Click "Sign In"
3. `/auth/login` → Login
4. `/dashboard` → Back to dashboard

### Typical Session
1. `/dashboard` → Check stats and recent challenges
2. `/practice` → Browse challenges
3. `/practice/[id]` → Solve a challenge with code execution
4. `/progress` → Check progress
5. `/chatbot` → Ask AI for help
6. `/strategies` → Learn techniques
7. `/mistakes` → Review past errors

---

## 🔐 Authentication Guard

Routes are protected by checking the `user` object from `AuthProvider`:

```typescript
if (!user) {
  router.push('/auth/login')
}
```

**Public Routes** (no authentication required):
- `/`
- `/auth/login`
- `/auth/signup`

**Protected Routes** (authentication required):
- All routes under `/dashboard`, `/practice`, `/strategies`, `/mistakes`, `/progress`, `/profile`, `/chatbot`

---

## 📱 Responsive Breakpoints

All routes are fully responsive with breakpoints at:
- `sm`: 640px (small screens)
- `md`: 768px (tablets)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large desktops)

Mobile-first design ensures optimal viewing on all devices.

---

## 🎨 Navigation Components

### Header/Navigation Bar
- Present on all protected routes
- Logo/brand name (top-left)
- Dashboard link (if not on dashboard)
- User menu (username + logout button)
- Fixed/sticky positioning for always-visible access

### Sidebar/Quick Links
- Not implemented (future enhancement)
- Could add left sidebar for quick navigation

### Breadcrumbs
- Not currently implemented
- Could enhance navigation clarity

---

## 🚀 URL Parameters

### Challenge ID
Format: `/practice/:id`
- `id` is a string identifier (e.g., "1", "2", "3")
- Determines which challenge is displayed
- Loads challenge data and boilerplate code

Example:
```
/practice/1         → Two Sum challenge
/practice/2         → Add Two Numbers challenge
/practice/my-custom → Any custom challenge
```

---

## 🌐 Query Parameters (Future)

Currently not used, but could be added for:
- Filtering: `/practice?difficulty=hard&category=array`
- Sorting: `/progress?sort=recent&range=month`
- Search: `/strategies?search=two+pointer`

---

## 🔗 Inter-Page Links

Common navigation patterns:

**From Dashboard:**
- "Practice" button → `/practice`
- "View Strategies" → `/strategies`
- "Review Mistakes" → `/mistakes`
- "AI Assistant" → `/chatbot`
- User profile → `/profile`

**From Practice:**
- "Back to Dashboard" → `/dashboard`
- Practice similar → `/practice`
- Ask AI help → `/chatbot`

**From Any Protected Page:**
- Logo click → `/dashboard`
- "Dashboard" button → `/dashboard`
- Logout button → `/` (home)

---

## 📊 Route Analytics Points

Key pages for user engagement tracking:
- `/dashboard` - Main hub (session start)
- `/practice` - Challenge browsing
- `/practice/[id]` - Active coding (most valuable)
- `/chatbot` - AI interaction
- `/progress` - Progress review
- `/profile` - User account viewing

---

## ⚡ Performance Considerations

- **Code Splitting**: Each route is code-split automatically by Next.js
- **Lazy Loading**: Components load on-demand
- **ISR**: Can be added for static challenge pages
- **Caching**: API responses can be cached with revalidateTag()

---

## 🔮 Future Route Additions

Potential new routes:
- `/dashboard/settings` - User settings
- `/dashboard/preferences` - Learning preferences
- `/community` - Community features
- `/leaderboard` - Ranking system
- `/interview-mode` - Mock interviews
- `/admin` - Admin dashboard (moderation)
- `/api/challenges` - REST API for challenges
- `/api/submissions` - Submission history

---

## 📝 Route Summary Table

| Route | Auth Required | Purpose | Components |
|-------|:-------------:|---------|------------|
| `/` | No | Landing/Home | Hero, Features, CTA |
| `/auth/login` | No | User Login | Form, Demo creds |
| `/auth/signup` | No | User Signup | Form, Validation |
| `/dashboard` | Yes | Main Hub | Stats, Challenges, Actions |
| `/practice` | Yes | Browse Challenges | Grid, Filters |
| `/practice/[id]` | Yes | Code Challenge | Editor, Execution, Output |
| `/strategies` | Yes | Learn Techniques | Card Grid, Tips |
| `/mistakes` | Yes | Error Analysis | List, Lessons, Stats |
| `/progress` | Yes | View Analytics | Charts, Goals |
| `/profile` | Yes | User Account | Badges, Stats, Info |
| `/chatbot` | Yes | AI Mentor | Chat Interface, Input |
| `POST /api/chat` | Yes | AI Backend | Groq Integration |

---

## 🎯 Quick Access Guide

**For Students:**
1. Start: `/` → Sign up → `/dashboard`
2. Practice: `/practice` → `/practice/[id]` → `/chatbot` (for help)
3. Track: `/progress` → `/profile`

**For Content Review:**
1. Strategies: `/strategies`
2. Common Mistakes: `/mistakes`
3. Personal Stats: `/profile` → `/progress`

**For Getting Help:**
1. AI Assistance: `/chatbot`
2. Strategy Guide: `/strategies`
3. Mistake Analysis: `/mistakes`

---

This document serves as a complete navigation reference for IterAI. For feature details, see README.md.
