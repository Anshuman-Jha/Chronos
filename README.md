# ⏳ Chronos | Intelligent Project Management

 <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Clerk-black?style=for-the-badge&logoColor=white&logo=clerk&color=6C47FF" alt="clerk" />
    <img src="https://img.shields.io/badge/-Shadcn_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcnui" />
    <img src="https://img.shields.io/badge/-Zod-black?style=for-the-badge&logoColor=white&logo=zod&color=3E67B1" alt="zod" />
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  </div>

> **A comprehensive project management suite designed for high-performance teams.** > Featuring interactive Gantt charts, Kanban boards, and real-time workflow tracking.

---

<div>
<img src="/client/public/Dashboard.png" alt="Chronos">

</div>
---

## 🚀 Overview

**Chronos** is a full-stack application built to streamline project workflows. Unlike simple to-do lists, Chronos handles complex project timelines, resource allocation, and team collaboration. It leverages a modern architecture with **AWS Cognito** for secure authentication and **PostgreSQL** for robust relational data management.

### ✨ Key Features
* **📊 Interactive Gantt Charts:** Visualize project timelines and dependencies in real-time.
* **📋 Agile Kanban Boards:** Drag-and-drop task management for agile workflows.
* **⚡ Real-Time Updates:** Instant UI synchronization using **Redux Toolkit Query**.
* **📱 Responsive Design:** Fully optimized for desktop and mobile using **Tailwind CSS**.

---

## 🛠️ Tech Stack

### **Frontend (`/client`)**
* **Framework:** React.js / Next.js
* **State Management:** Redux Toolkit & RTK Query
* **Styling:** Tailwind CSS, Lucide React
* **Visualization:** Recharts (for analytics), Gantt libraries

### **Backend (`/server`)**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Cloud/DevOps:** AWS (EC2, Cognito, S3), Docker

---

## 🏗️ System Architecture

```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'primaryColor': '#00d4ff', 'primaryTextColor': '#fff', 'primaryBorderColor': '#00d4ff', 'lineColor': '#b967ff', 'secondaryColor': '#b967ff', 'tertiaryColor': '#fff'}}}%%

graph TD
    classDef client fill:#000000,stroke:#00d4ff,stroke-width:2px,color:#fff;
    classDef server fill:#000000,stroke:#b967ff,stroke-width:2px,color:#fff;
    classDef db fill:#000000,stroke:#2ecc71,stroke-width:2px,color:#fff;
    classDef user fill:#000000,stroke:#f1c40f,stroke-width:2px,color:#fff;

    User((User)):::user
    
    subgraph Frontend ["🖥️ Frontend Layer"]
        NextJS["Next.js Client<br/>(Redux Toolkit + TW CSS)"]:::client
    end

    subgraph Backend ["⚙️ Backend Layer"]
        Express["Express.js API<br/>(Auth, Logic, Integration)"]:::server
    end

    subgraph Data ["💾 Data Layer"]
        Postgres[("PostgreSQL<br/>via AWS RDS")]:::db
        Prisma["Prisma ORM"]:::db
    end

    User ==>|Interacts| NextJS
    NextJS <==>|HTTP/REST Calls| Express
    Express <==>|Query/Mutate| Prisma
    Prisma <==>|SQL Commands| Postgres
    
    linkStyle 0 stroke:#f1c40f,stroke-width:3px;
    linkStyle 1 stroke:#00d4ff,stroke-width:3px;
    linkStyle 2 stroke:#b967ff,stroke-width:3px;
    linkStyle 3 stroke:#2ecc71,stroke-width:3px;
```

---

## 📂 Project Structure

This repository follows a monorepo-style structure:

```bash
Chronos/
├── client/         # Frontend React/Next.js Application
│   ├── src/
│   ├── public/
│   └── package.json
│
└── server/         # Backend Node.js/Express API
    ├── src/
    ├── prisma/     # Database Schema
    └── package.json
```

---

## ⚙️ Environment Setup

To run this project locally, you will need to create `.env` files for both the client and server.

### **Server (.env)**
Create a file named `.env` in the `server` directory:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/chronos?schema=public"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"

# CORS Configuration
FRONTEND_URL="http://localhost:3000"
```

### **Client (.env.local)**
Create a file named `.env.local` in the `client` directory:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```

---