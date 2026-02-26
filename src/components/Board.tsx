import Column from "./Column";
import { Box } from "@mui/material";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useGroupedTasks } from "../hooks/useGroupedTasks";
import { useTaskMutations } from "../hooks/useTaskMutations";
import type { ColumnType } from "../types/task";

function Board() {
  const { updateTaskMutation } = useTaskMutations();

  const { backlog, in_progress, review, done } = useGroupedTasks();

  // Handles the end of a drag event.
  //  Finds the moved task and the destination column, triggering an update mutation.

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const taskId = String(active.id);
    const newColumn = over.id as ColumnType;
    updateTaskMutation({
      id: taskId,
      data: { column: newColumn },
    });
  };
  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            p: 3,
            overflowX: "auto",
          }}
        >
          <Column title="TO DO" columnKey="backlog" tasks={backlog} />
          <Column
            title="In Progress"
            columnKey="in_progress"
            tasks={in_progress}
          />
          <Column title="In Review" columnKey="review" tasks={review} />
          <Column title="Done" columnKey="done" tasks={done} />
        </Box>{" "}
      </DndContext>
    </div>
  );
}

export default Board;
