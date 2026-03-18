# 🤖 Agent Guide — MedPath MVP

## 🎯 Mission

Build and ship the **MedPath MVP** in 6 weeks to validate the core hypothesis:

> A medical student can find a relevant senior and start a meaningful text conversation within 10 minutes of signup.

Every decision must support this loop. If it doesn’t → defer.

---

## 🧠 Product Context

* Product: MedPath MVP
* Stack: Next.js 14, Supabase, Vercel
* Users: Medical students (mentees) & seniors (mentors)
* Core Value: Fast mentor discovery + real-time chat

---

## 🚫 Non-Goals (Strict)

Do NOT build:

* Voice/video calls
* Scheduling systems
* AI matching
* Admin panels
* Push/email notifications
* File uploads in chat

---

## 🔁 Core User Flow (Critical Path)

### Mentee Flow

1. Land on homepage → click "Find a Senior"
2. Enter email → magic link login
3. Complete profile (<60s)
4. Browse mentors → apply filters
5. View mentor → click "Connect"
6. Send request note (≤280 chars)
7. Wait for acceptance
8. Start chat → send first message

### Mentor Flow

1. Login → set role = Mentor
2. Add specialty + availability
3. Receive request notification
4. Accept/Decline
5. Chat with mentee

👉 If this flow breaks → MVP fails

---

## 🧩 Feature Modules

### 1. Auth

* Passwordless (magic link via Supabase)
* Session persistence (30 days)
* No OAuth (optional later)

---

### 2. Profile

#### Common Fields

* display_name (required)
* college (required)
* stage (required)
* bio (optional)

#### Mentor إضافات

* specialty (required)
* availability (Available/Busy)

---

### 3. Mentor Directory

* Grid layout (responsive)
* Filters:

  * Specialty
  * College
  * Availability
  * Stage
* Infinite scroll (20/page)
* Sorting: Recently active

---

### 4. Connection System

* Max 5 pending requests per mentee
* Status: pending / accepted / declined / blocked
* Request note required (≤280 chars)
* Mentor can Accept/Decline

---

### 5. Chat (Core Feature)

* 1:1 messaging only
* Real-time via Supabase Realtime
* Features:

  * Read receipts
  * Typing indicator
  * Persistent history
  * URL auto-detect

❌ No attachments / edits / reactions

---

### 6. Notifications

* In-app only
* Types:

  * New request
  * Accepted/Declined
  * New message
* Badge count
* Click → deep link

---

### 7. Safety

* Block user
* Report message
* Regex warning for phone numbers

---

## 🗄️ Data Model (Core Tables)

* profiles
* colleges (seeded)
* connections
* messages
* notifications

👉 Enforce Supabase RLS strictly

---

## 🖥️ Screens

* `/` — Landing
* `/auth` — Login
* `/onboarding` — Profile setup
* `/dashboard`
* `/mentors`
* `/mentors/[id]`
* `/connections`
* `/chat/[id]`
* `/notifications`
* `/profile/me`

---

## 🏗️ Engineering Principles

### 1. Speed > Perfection

* Ship fast, iterate later
* Avoid over-engineering

### 2. Minimize Surface Area

* Fewer features = better validation

### 3. Reuse Supabase Heavily

* Auth
* Realtime
* DB
* RLS

### 4. Mobile-first UI

* PWA responsive

---

## 📊 Success Metrics

* ≥ 60% request acceptance rate
* ≥ 50% chats with 6+ messages
* ≤ 10 min signup → first message

---

## 🧪 Testing Rules

Before marking feature complete:

* Can user reach chat in <10 mins?
* Does real-time messaging work reliably?
* Are edge cases handled:

  * Decline flow
  * Block flow
  * Empty states

---

## ⚠️ Common Failure Points

* Broken auth redirect
* Chat not real-time
* Overcomplicated filters
* Too many required fields
* Slow onboarding

---

## 📅 Execution Plan

Week 1 → Auth + Setup
Week 2 → Profiles
Week 3 → Directory + Requests
Week 4 → Chat
Week 5 → Notifications + Safety
Week 6 → Polish + Launch

---

## 🚀 Definition of Done

MVP is DONE when:

✅ User signs up
✅ Finds mentor
✅ Sends request
✅ Gets accepted
✅ Sends message
✅ Receives reply

All within **10 minutes**

---

## 🧭 Post-MVP Direction

Only after validation:

* Email notifications
* Availability calendar
* Ratings
* Voice calls
* Smart matching

---

## 🧑‍💻 Agent Behavior Rules

* Always prioritize core flow
* Reject feature creep
* Suggest simplest implementation
* Prefer working solution over ideal architecture
* Think in iterations, not completeness
