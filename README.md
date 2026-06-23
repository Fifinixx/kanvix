# KANVIX

> Track work together, in real time. Organize projects across your teams on a shared board where every change appears instantly for everyone.

![KANVIX Banner](https://github.com/user-attachments/assets/deb9f4b0-1c4f-42bb-be71-d5d6d35d8bb2)

## Overview

KANVIX is a multi-tenant project and task tracker built for modern teams. Each workspace is fully isolated — create a workspace, invite your team, and collaborate on shared boards where every move, update, and assignment syncs in real time across all connected clients.

## Features

- 🏢 **Multi-tenant workspaces** — separate, isolated environments per team or organization
- 🔐 **Authentication** — secure JWT-based auth with refresh token rotation and httpOnly cookies
- 📋 **Kanban boards** — drag-and-drop cards across customizable columns
- ⚡ **Real-time sync** — live updates via WebSockets; see changes as they happen
- 👥 **Roles & permissions** — Owner, Admin, and Member roles per workspace
- 📨 **Invite system** — invite teammates by email with token-based accept/reject flow

## Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)

**Backend**
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) + [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/)
- [Socket.io](https://socket.io/) for real-time features
- [Zod](https://zod.dev/) for schema validation

## Project Structure

```
kanvix/
├── shared/
├── frontend/          # Next.js App Router frontend
└── backend/           # Express + TypeScript API
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/kanvix.git
cd kanvix
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
```

Fill in your `.env`:

```env
ALLOWED_ORIGIN = "your frontend url"
DATABASE_URL='your db url'
ACCESS_TOKEN_SECRET = "your secret"
ACCESS_TOKEN_EXPIRY = "15m"

```

Run migrations and start the server:

```bash
npx prisma migrate dev
npm run dev
```

### 3. Set up the frontend

```bash
cd frontend
npm install
cp .env.example .env.local
```

Fill in your `.env.local`:

```env
NEXT_PUBLIC_BASE_URL = "your frontend url"
```

Start the dev server:

```bash
npm run dev
```

The app will be running at `http://localhost:9000`.

## Roadmap

- [x] Landing page
- [x] JWT authentication (login, register, refresh, logout)
- [ ] Workspace creation & management
- [ ] Role-based access control (Owner, Admin, Member)
- [ ] Email invite system
- [ ] Projects & boards
- [ ] Drag-and-drop kanban cards
- [ ] Real-time collaboration via WebSockets
- [ ] Activity log
- [ ] In-app notifications
- [ ] Public deployment

## License

[MIT](LICENSE)

---

Built by [Debmalya](https://github.com/Fifinixx)
