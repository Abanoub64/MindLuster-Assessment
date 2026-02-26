import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types/task";
import { useTaskMutations } from "../hooks/useTaskMutations";

import EditIcon from "@mui/icons-material/Edit";
import { useUIStore } from "../store/useUIStore";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { deleteTask } = useTaskMutations();
  const { openModal } = useUIStore();

  // console.log("rendering card", task.id);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
  };

  const getPriorityChip = () => {
    switch (task.priority) {
      case "LOW":
        return <Chip label="LOW" size="small" />;
      case "MEDIUM":
        return <Chip label="MEDIUM" color="warning" size="small" />;
      case "HIGH":
        return <Chip label="HIGH" color="error" size="small" />;
      default:
        return <Chip label="LOW" size="small" />;
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 2,
        transition: "0.2s ease",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box {...listeners} {...attributes} sx={{ cursor: "grab" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={600}>
              {task.title}
            </Typography>

            {getPriorityChip()}
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {task.description}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => openModal(task.column, task)}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="error"
            onClick={() => deleteTask(task.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
