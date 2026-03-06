90141105This document is designed to be copy-pasted into **Claude (using the Artifacts feature)**, **Cursor**, or **ChatGPT (with Canvas)**. It follows the **PSB (Plan, Setup, Build)** framework and provides the high-context "blueprints" an AI needs to generate consistent, working code rather than just snippets.

---

# Project Specification: JamStation V1

## 1. Product Overview

**JamStation** is a real-time, Web2-first social platform for live music jamming. It solves the "latency gap" by providing a stage for high-fidelity, synchronized musical collaboration between hosts and approved audience members.

### Core Value Proposition:

* **For Hosts:** A digital stage with a built-in audience and easy monetization via entry fees.
* **For Audience:** A place to discover "good" singers and participate in live jam sessions.

---

## 2. Technical Stack & Conventions

**AI Instructions:** Adhere strictly to these technologies and patterns.

* **Frontend:** React (Vite) + Tailwind CSS + Lucide Icons.
* **Backend:** Node.js (Express) hosted on **Google Cloud Run**.
* **Real-time Engine:** **WebRTC** (via LiveKit or Agora) for <50ms audio latency.
* **Database:** **PostgreSQL** (hosted on Google Cloud SQL) for structured social/session data.
* **Authentication:** JWT-based secure login.
* **Storage:** Google Cloud Storage for profile photos and "voice sample" notes.

---

## 3. V1 Feature Requirements (Must-Haves)

### A. User Management

* **Jam Profiles:** Users must upload an optional "Voice Sample" (audio file) to be eligible as a Host.
* **Social Discovery:** Follow/Unfollow functionality and a "Linktree-style" social link section on profiles.

### B. The Live Stage

* **Session Scheduling:** Hosts can create "Instant" or "Scheduled" sessions with shareable invite links.
* **Host Controls:** Mute/Unmute self, Mute all, and "Approve to Stage" logic for audience requests.
* **Audience Role:** Passive listeners who can click a "Request to Jam" button.

### C. Trust & Safety

* **Moderation:** Host can kick/ban users; Audience can report offensive sessions.
* **Audio Setup:** A "Pre-flight Check" to test mic levels and detect high-latency Bluetooth devices before joining.

---

## 4. Database Schema (Draft)

**AI Instructions:** Implement these primary entities:

* `Users`: `id`, `username`, `email`, `password_hash`, `voice_sample_url`, `bio`.
* `Sessions`: `id`, `host_id`, `title`, `start_time`, `status` (pending, live, ended), `entry_fee`.
* `StageRequests`: `id`, `session_id`, `user_id`, `status` (pending, approved, rejected).
* `Follows`: `follower_id`, `following_id`.

---

## 5. Implementation Roadmap for AI

**Phase 1: Foundation**

1. Generate a standardized project structure with a Shared Types library.
2. Create the PostgreSQL schema and basic Auth (Signup/Login).

**Phase 2: The Audio Pipeline**

1. Integrate the WebRTC provider (LiveKit) for basic "Host broadcasts, Audience hears".
2. Implement the "Request to Speak" WebSocket flow.

**Phase 3: Social & UI**

1. Build the Profile Page with the "Voice Sample" uploader.
2. Design the "Live Dashboard" with real-time participant lists and chat.

---

### **Prompt to use with this file:**

> "I have attached my **JamStation V1 Spec**. Read the entire document carefully. I want to start by building the **Backend Foundation (Phase 1)**. Please generate the `package.json`, the Prisma/SQL schema for the database described, and a basic Express server setup following the Google Cloud Run conventions."