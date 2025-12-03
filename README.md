<h1 align="center">🧸 Figurine Focus (专注玩偶)</h1>

<p align="center">
  <strong>A delightful Pomodoro timer app with an interactive virtual pet companion</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-5.1-646CFF?style=flat-square&logo=vite" alt="Vite"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0_Alpha-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 📖 Overview

**Figurine Focus** is a gamified productivity app that combines the Pomodoro Technique with an interactive virtual pet experience. Stay focused, complete tasks, and watch your digital companion react to your productivity journey!

The app features a cute character that responds to your focus sessions - it stays awake while you're actively engaged and falls asleep when you take breaks. Customize your companion with different costumes and unlock achievements as you build productive habits.

## ✨ Features

### 🎯 Core Functionality
- **Pomodoro Timer** - Customizable focus (25 min default) and break (5 min default) sessions
- **Task Management** - Create, complete, and organize tasks by category (Work, Study, Reading, Other)
- **Focus Mode** - Distraction-free full-screen timer with character companion
- **Session Tracking** - Automatic logging of focus time and task completion

### 🧸 Interactive Character
- **Eye Tracking** - Character eyes follow your cursor movement
- **Emotional States** - Character reacts to focus states (focusing, paused, completed)
- **Costume System** - Unlock and equip accessories (Glasses, Flower, Crown)
- **Radial Menu** - Long-press interaction for costume selection
- **Sleep/Wake Animation** - Character sleeps during inactivity and wakes on interaction

### 📊 Data & Analytics
- **KPI Dashboard** - Total focus time, completed tasks, consecutive days, focus level
- **Weekly Chart** - Visual bar chart of daily focus minutes
- **Monthly Trends** - Line chart showing 4-week progress
- **Task Distribution** - Pie chart breakdown by task category
- **Achievement System** - Unlock badges for milestones:
  - 🏆 Focus Master - 7 consecutive days
  - ✅ Task Master - 20 completed tasks
  - ⭐ Time Guardian - 100 hours of focus

### ⚙️ Customization
- **Module Management** - Drag-and-drop to reorder/hide modules
- **Theme Colors** - 5 accent color options (Indigo, Blue, Purple, Pink, Orange)
- **Dark Mode** - Full dark theme support
- **Sound & Haptics** - Configurable audio and vibration feedback
- **Notification Settings** - Push notification preferences

### 🌐 Localization
- Primary language: **Simplified Chinese** (zh-CN)
- Prepared for internationalization with i18n string files

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 with TypeScript |
| **Build Tool** | Vite 5 with SWC |
| **Styling** | Tailwind CSS v4 (Alpha) |
| **State Management** | Zustand with persist middleware |
| **Routing** | React Router DOM v7 |
| **Charts** | Recharts |
| **Drag & Drop** | dnd-kit |
| **Icons** | Lucide React |
| **Utilities** | clsx, tailwind-merge |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/cristlian/Smart-Task-Tracker.git

# Navigate to project directory
cd Smart-Task-Tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## 📁 Project Structure

```
src/
├── components/
│   ├── Data/               # Analytics components
│   │   ├── KPICards.tsx    # Key performance indicators
│   │   ├── WeeklyChart.tsx # Weekly bar chart
│   │   ├── MonthlyChart.tsx # Monthly trend line chart
│   │   ├── TaskDistribution.tsx # Category pie chart
│   │   └── RecentAchievements.tsx # Achievement list
│   ├── Layout/
│   │   └── BottomNav.tsx   # Tab navigation
│   ├── LowerZone/
│   │   ├── CharacterZone.tsx # Interactive pet component
│   │   └── FaceSprites.css # Character animations
│   ├── Settings/
│   │   ├── ModuleSettings.tsx # Drag-drop module config
│   │   └── Switch.tsx      # Toggle component
│   └── UpperZone/
│       ├── TimerModule.tsx # Pomodoro timer
│       ├── TaskListModule.tsx # Task management
│       ├── CurrentTaskModule.tsx # Active task display
│       └── ModuleDock.tsx  # Module container
├── i18n/
│   └── strings.zh-CN.ts    # Chinese translations
├── lib/
│   └── utils.ts            # Utility functions
├── pages/
│   ├── HomePage.tsx        # Main dashboard
│   ├── FocusPage.tsx       # Focus mode screen
│   ├── DataPage.tsx        # Analytics page
│   └── SettingsPage.tsx    # Settings page
├── store/
│   └── useStore.ts         # Zustand state management
├── styles/
│   └── index.css           # Global styles & Tailwind
├── types.ts                # TypeScript interfaces
├── App.tsx                 # Root component with routing
└── main.tsx                # Entry point
```

---

## 🗺 Roadmap

### Phase 1: Current State ✅
- [x] Pomodoro timer with focus/break modes
- [x] Task management with categories
- [x] Interactive character with costumes
- [x] Data analytics dashboard
- [x] Achievement system
- [x] Local storage persistence
- [x] Dark mode & theming
- [x] Responsive iPhone 14 viewport design

---

## 📱 Next Steps: iOS Native App Development

### Phase 2: React Native Migration

#### 2.1 Project Setup
```bash
# Initialize React Native project with Expo
npx create-expo-app figurine-focus-mobile --template expo-template-blank-typescript

# Or with bare React Native
npx react-native init FigurineFocus --template react-native-template-typescript
```

#### 2.2 Key Migration Tasks

| Web Library | React Native Equivalent |
|-------------|------------------------|
| `react-router-dom` | `@react-navigation/native` + `@react-navigation/bottom-tabs` |
| `recharts` | `react-native-svg-charts` or `victory-native` |
| `@dnd-kit` | `react-native-draggable-flatlist` |
| `tailwindcss` | `nativewind` or `tailwind-rn` |
| `localStorage` | `@react-native-async-storage/async-storage` |
| CSS animations | `react-native-reanimated` + `react-native-gesture-handler` |

#### 2.3 Native Features to Implement
- [ ] Push notifications via `expo-notifications` or `@react-native-firebase/messaging`
- [ ] Haptic feedback via `expo-haptics`
- [ ] Background timer via `react-native-background-timer`
- [ ] App state handling for pause/resume
- [ ] iOS widgets for timer status (WidgetKit)
- [ ] Apple Watch companion app (optional)

#### 2.4 Platform-Specific Considerations
- [ ] Safe area handling with `react-native-safe-area-context`
- [ ] Dynamic Island integration for timer display
- [ ] iOS-native navigation gestures
- [ ] App Store submission requirements (privacy manifest, screenshots)

---

### Phase 3: Backend Architecture & Optimization

#### 3.1 Recommended Backend Stack

| Component | Recommended Technology |
|-----------|----------------------|
| **Runtime** | Node.js with Express/Fastify or Go |
| **Database** | PostgreSQL (primary) + Redis (caching) |
| **Authentication** | Firebase Auth or Auth0 or Supabase Auth |
| **API Style** | RESTful API or GraphQL |
| **Real-time** | WebSockets or Server-Sent Events |
| **Cloud Platform** | AWS / Google Cloud / Vercel Edge Functions |
| **ORM** | Prisma or Drizzle (for Node.js) |

#### 3.2 Database Schema Design

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User settings (sync across devices)
CREATE TABLE user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    focus_duration INT DEFAULT 25,
    break_duration INT DEFAULT 5,
    sound_enabled BOOLEAN DEFAULT true,
    notification_enabled BOOLEAN DEFAULT true,
    theme_color VARCHAR(20) DEFAULT 'indigo',
    dark_mode BOOLEAN DEFAULT false,
    modules JSONB DEFAULT '[]'::jsonb
);

-- Tasks
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) DEFAULT 'other',
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Focus sessions
CREATE TABLE focus_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    task_id UUID REFERENCES tasks(id),
    duration_minutes INT NOT NULL,
    completed BOOLEAN DEFAULT false,
    started_at TIMESTAMP DEFAULT NOW(),
    ended_at TIMESTAMP
);

-- Achievements
CREATE TABLE user_achievements (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id VARCHAR(50) NOT NULL,
    unlocked_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_id)
);

-- User costumes
CREATE TABLE user_costumes (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    costume_id VARCHAR(50) NOT NULL,
    equipped BOOLEAN DEFAULT false,
    PRIMARY KEY (user_id, costume_id)
);
```

#### 3.3 API Endpoints Design

```
Authentication:
POST   /api/auth/register          # Email/password registration
POST   /api/auth/login             # Login with credentials
POST   /api/auth/social/:provider  # OAuth (Apple, Google)
POST   /api/auth/refresh           # Refresh access token
DELETE /api/auth/logout            # Logout

User:
GET    /api/user/profile           # Get user profile
PATCH  /api/user/profile           # Update profile
GET    /api/user/settings          # Get settings
PATCH  /api/user/settings          # Update settings
DELETE /api/user/account           # Delete account

Tasks:
GET    /api/tasks                  # List all tasks
POST   /api/tasks                  # Create task
PATCH  /api/tasks/:id              # Update task
DELETE /api/tasks/:id              # Delete task

Focus Sessions:
POST   /api/sessions/start         # Start focus session
PATCH  /api/sessions/:id/complete  # Complete session
GET    /api/sessions/stats         # Get statistics

Achievements:
GET    /api/achievements           # Get all achievements
GET    /api/achievements/unlocked  # Get user's unlocked

Sync:
POST   /api/sync/upload            # Upload local changes
GET    /api/sync/download          # Download server state
```

#### 3.4 Backend Optimization Strategies

1. **Caching Layer**
   - Redis for session data and frequently accessed stats
   - Cache invalidation on data mutations
   - CDN for static assets

2. **Database Optimization**
   - Indexes on `user_id`, `created_at`, `category`
   - Materialized views for complex statistics
   - Connection pooling with PgBouncer

3. **API Performance**
   - Response compression (gzip/brotli)
   - Pagination for lists
   - Field selection (GraphQL) or sparse fieldsets
   - Rate limiting per user

4. **Sync Strategy**
   - Offline-first with conflict resolution
   - Last-write-wins or custom merge logic
   - Delta sync to minimize payload

---

### Phase 4: User Authentication & Login System

#### 4.1 Authentication Methods

| Method | Implementation |
|--------|---------------|
| **Email/Password** | Standard registration with email verification |
| **Sign in with Apple** | Required for iOS App Store |
| **Google OAuth** | Optional social login |
| **Magic Link** | Passwordless email authentication |

#### 4.2 Implementation Steps

1. **Setup Authentication Provider**
   ```typescript
   // Using Firebase Auth (recommended for mobile)
   import { initializeApp } from 'firebase/app';
   import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
   
   const auth = getAuth(app);
   ```

2. **JWT Token Flow**
   ```
   Client                    Backend                    Auth Provider
     |                          |                            |
     |-- Login Request -------->|                            |
     |                          |-- Verify Credentials ----->|
     |                          |<---- User Data ------------|
     |                          |                            |
     |<-- Access + Refresh -----|                            |
     |       Tokens             |                            |
     |                          |                            |
     |-- API Request + Token -->|                            |
     |<-- Protected Data -------|                            |
   ```

3. **Secure Storage**
   ```typescript
   // iOS Keychain storage for tokens
   import * as SecureStore from 'expo-secure-store';
   
   await SecureStore.setItemAsync('accessToken', token);
   ```

4. **Auth State Management**
   ```typescript
   // Zustand auth slice
   interface AuthState {
     user: User | null;
     accessToken: string | null;
     isAuthenticated: boolean;
     login: (email: string, password: string) => Promise<void>;
     logout: () => void;
     refreshToken: () => Promise<void>;
   }
   ```

#### 4.3 Security Best Practices
- [ ] HTTPS only for all API calls
- [ ] Token refresh rotation
- [ ] Secure storage for sensitive data (iOS Keychain)
- [ ] Rate limiting on auth endpoints
- [ ] Account lockout after failed attempts
- [ ] Password strength requirements
- [ ] Two-factor authentication (optional)

---

### Phase 5: Deployment & Distribution

#### 5.1 iOS App Store Checklist
- [ ] Apple Developer Account ($99/year)
- [ ] App icons (all required sizes)
- [ ] Launch screens
- [ ] Privacy policy URL
- [ ] App Store screenshots (6.7", 6.5", 5.5")
- [ ] App description and keywords
- [ ] TestFlight beta testing
- [ ] App Store Review Guidelines compliance

#### 5.2 Backend Deployment
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Staging and production environments
- [ ] Database backups and monitoring
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Datadog/New Relic)

---

## 🎯 Development Priority Order

```
1. React Native Migration         [2-3 weeks]
   └── Core UI components
   └── Navigation setup
   └── Local storage migration
   
2. Backend Setup                  [1-2 weeks]
   └── Database schema
   └── Basic REST API
   └── Authentication endpoints
   
3. User Authentication            [1 week]
   └── Sign in with Apple
   └── Email/password auth
   └── Token management
   
4. Data Sync                      [1-2 weeks]
   └── Offline-first architecture
   └── Conflict resolution
   └── Background sync
   
5. iOS Native Features            [1 week]
   └── Push notifications
   └── Widgets
   └── Haptics
   
6. Testing & Polish               [1-2 weeks]
   └── Unit tests
   └── E2E tests
   └── Performance optimization
   
7. App Store Submission           [1 week]
   └── Assets preparation
   └── Beta testing
   └── Review submission
```

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Pomodoro Technique® by Francesco Cirillo
- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from iOS Human Interface Guidelines

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/cristlian">@cristlian</a>
</p>
