import { AppBar, Toolbar, Typography, Box, TextField } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useUIStore } from "../store/useUIStore";
import { useTaskQuery } from "../hooks/useTaskQuery";

export default function Header() {
  const { searchTerm, setSearchTerm } = useUIStore();
  const { data: tasks = [] } = useTaskQuery();
  const tasksNo: number = tasks.length + 1;

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{ bgcolor: "white", color: "black" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <DashboardIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Kanban Board
            <br />
            <Typography variant="h6" fontWeight={300}>
              {tasksNo} Tasks
            </Typography>
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: 250,
            bgcolor: "#f4f5f7",
            borderRadius: 2,
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
