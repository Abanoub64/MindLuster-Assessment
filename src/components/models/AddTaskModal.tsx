import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useUIStore } from "../../store/useUIStore";
import TextFields from "./TextFiled";
import DropDownMenu from "./DropDownMenu";
import Typography from "@mui/material/Typography";
import RadioButtonsGroup from "./RadioGroup";
import { useTaskMutations } from "../../hooks/useTaskMutations";
import type { CreateTask } from "../../types/task";

export default function AddTaskModal() {
  const { isModalOpen, closeModal, selectedColumn, editingTask } = useUIStore();
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    priority: "LOW",
    column: "",
  });

  React.useEffect(() => {
    if (isModalOpen) {
      if (editingTask) {
        setFormData({
          title: editingTask.title,
          description: editingTask.description,
          priority: editingTask.priority as string,
          column: editingTask.column,
        });
      } else if (selectedColumn) {
        setFormData({
          title: "",
          description: "",
          priority: "LOW",
          column: selectedColumn,
        });
      }
    }
  }, [isModalOpen, selectedColumn, editingTask]);

  const { createTask, updateTaskMutation, isCreated, isUpdating } =
    useTaskMutations();

  const isSubmitting = editingTask ? isUpdating : isCreated;

  const onChange =
    (formDataTarget: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [formDataTarget]: e.target.value,
      }));
    };

  const handleClose = () => {
    closeModal();
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    const taskColumn = formData.column || selectedColumn;
    if (!taskColumn) return;

    if (editingTask) {
      updateTaskMutation({
        id: editingTask.id,
        data: {
          title: formData.title,
          description: formData.description,
          column: taskColumn as CreateTask["column"],
          priority: formData.priority,
        },
      });
    } else {
      const newTask: CreateTask = {
        title: formData.title,
        description: formData.description,
        column: taskColumn as CreateTask["column"],
        priority: formData.priority,
      };
      createTask(newTask);
    }

    closeModal();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={isModalOpen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {editingTask ? "Edit Task" : "Create New Task"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        <TextFields
          placeholder="Task title"
          value={formData.title}
          onChange={onChange("title")}
        />
        <TextFields
          placeholder="Description"
          value={formData.description}
          onChange={onChange("description")}
        />
        <DropDownMenu
          value={formData.column}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              column: value,
            }))
          }
        />
        <RadioButtonsGroup
          value={formData.priority}
          onChange={onChange("priority")}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.title.trim()}
        >
          {isSubmitting
            ? "Saving..."
            : editingTask
              ? "Save Changes"
              : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
