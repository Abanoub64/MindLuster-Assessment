import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";

const columnOptions = [
  { value: "backlog", label: "TO DO" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "In Review" },
  { value: "done", label: "Done" },
];

interface DropDownMenuProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DropDownMenu({ value, onChange }: DropDownMenuProps) {
  const handleChange = (e: SelectChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
      <InputLabel>Column</InputLabel>
      <Select value={value} label="Column" onChange={handleChange}>
        {columnOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
