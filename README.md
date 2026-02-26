# Kanban board - Frontend Assesment :)

> **Note**: AI was used exclusively to assist in generating this `README.md`.

This is a React-based Kanban style ToDo lisst matching the requirements. Uses React, Zustand (for state), React Query, Material UI, and `@dnd-kit` (drag and drop).

## Features

✅ **Display tasks across 4 columns**: TO DO, In Progress, In Review, Done.
✅ **CRUD**: Create, edit, delete tasks.
✅ **Drag and Drop**: easily move between columns.
✅ **Pagination**: Column pagination.
✅ **Search**: Search bar filters by both `title` and `description`.
✅ **UI**: Built with Material UI (MUI).
✅ **Data Fetch/Cache**: React Query hooks.
✅ **Mock API**: `json-server` running on port 4000.

---

## 🚀 Setup Instructions

Follow these steps to run the application locally.

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Mock API Server

You can use one of the following methods to mock your API:

**Option 1 – Local Mock API with json-server:**

1. Install `json-server` globally:

```bash
npm install -g json-server
```

2. Create `db.json` (if it does not exist) with the following content:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Design homepage",
      "description": "Include hero section",
      "column": "backlog",
      "priority": "LOW"
    }
  ]
}
```

3. Run the server:

```bash
json-server --watch db.json --port 4000
```

4. Access via: `http://localhost:4000/tasks`

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
