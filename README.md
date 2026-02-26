# Kanban board - Frontend Assesment :)

This is a React-based Kanban style ToDo lisst matching the requirements. Uses React, Zustand (for state), React Query, Material UI, and `@dnd-kit` (drag and drop).

## Features

✅ **Display tasks across 4 columns**: TO DO, In Progress, In Review, Done.
✅ **CRUD**: Create, edit, delete tasks.
✅ **Drag and Drop**: easily move between columns.
✅ **Pagination**: Column pagination.
✅ **Search**: Search bar filters by both `title` and `description`.
✅ **UI**: Built with Material UI (MUI).
✅ **Data Fetch/Cache**: React Query hooks.
✅ **Mock API**: `json-server` running on port 3000.

---

## 🚀 Setup Instructions

Follow these steps to run the application locally.

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Mock API Server

The application uses `json-server` as a mock backend. As per the requirements, it should run on port `4000`.

Open a terminal and run:

```bash
npx json-server --watch db.json --port 4000
```

_(The API will be accessible at `http://localhost:4000/tasks`)_

### 3. Start the React Frontend

Open a **new, separate terminal** and start the Vite development server:

```bash
npm run dev
```

The application will launch in your browser (usually at `http://localhost:5173`).

---

## 🏗️ Project Structure

- `src/components/`: Reusable UI components (Board, Column, Header, TaskCard, and Modals).
- `src/hooks/`: Custom React Query hooks for fetching (`useTaskQuery`) and modifying (`useTaskMutations`) data.
- `src/services/`: API layer using `axios` to fetch/push data to the `json-server`.
- `src/store/`: Global Zustand store (`useUIStore`) managing modal state, search term, and pagination.
- `src/types/`: TypeScript definitions for standardizing the Task object shapes.
