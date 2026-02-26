import { useUIStore } from "../store/useUIStore";
import { Box, Typography, Button, Stack } from "@mui/material";
import type { Task } from "../types/task";
import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./TaskCard";
interface ColumnProps {
  title: string;
  columnKey: "backlog" | "in_progress" | "review" | "done";
  tasks: Task[];
}

function Column({ title, columnKey, tasks }: ColumnProps) {
  const { openModal } = useUIStore();
  const { setNodeRef } = useDroppable({
    id: columnKey,
  });
  const { columnPages, setColumnPage } = useUIStore();

  const currentPage = columnPages[columnKey];

  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedTasks = tasks.slice(startIndex, endIndex);

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  const getColumnColor = (key: string) => {
    switch (key) {
      case "backlog":
        return "#3b82f6";
      case "in_progress":
        return "#f59e0b";
      case "review":
        return "#8b5cf6";
      case "done":
        return "#10b981";
      default:
        return "#94a3b8";
    }
  };

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: 300,
        minHeight: 500,
        bgcolor: "#f4f5f7",
        borderRadius: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: getColumnColor(columnKey),
            }}
          />
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {tasks.length}
        </Typography>
      </Stack>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {paginatedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => openModal(columnKey)}
      >
        Add Task
      </Button>
      {totalPages > 1 && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Button
            size="small"
            disabled={currentPage === 1}
            onClick={() => setColumnPage(columnKey, currentPage - 1)}
          >
            Prev
          </Button>

          <Typography variant="caption">
            {currentPage} / {totalPages}
          </Typography>

          <Button
            size="small"
            disabled={currentPage === totalPages}
            onClick={() => setColumnPage(columnKey, currentPage + 1)}
          >
            Next
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default Column;
