import { create } from "zustand";
import type { ColumnType, Task } from "../types/task";

type UIStore = {
  searchTerm: string;
  setSearchTerm: (Term: string) => void;
  isModalOpen: boolean;
  selectedColumn: ColumnType | null;

  editingTask: Task | null;
  openModal: (Column: ColumnType, task?: Task | null) => void;
  closeModal: () => void;

  columnPages: Record<ColumnType, number>;
  setColumnPage: (column: ColumnType, page: number) => void;
};

/**
 * Global Zustand store combining UI state management.
 * Handles the Add/Edit Task Modal state, global Search filter, and column Pagination.
 */
export const useUIStore = create<UIStore>((set) => ({
  isModalOpen: false,
  selectedColumn: null,
  editingTask: null,

  openModal: (Column, task = null) => {
    set({
      isModalOpen: true,
      selectedColumn: Column,
      editingTask: task,
    });
  },
  searchTerm: "",
  setSearchTerm: (Term) => {
    set({
      searchTerm: Term,
    });
  },
  closeModal: () => {
    set({
      isModalOpen: false,
      selectedColumn: null,
      editingTask: null,
    });
  },

  columnPages: {
    backlog: 1,
    in_progress: 1,
    review: 1,
    done: 1,
  },

  setColumnPage: (column: ColumnType, page: number) =>
    set((state) => ({
      columnPages: {
        ...state.columnPages,
        [column]: page,
      },
    })),
}));
