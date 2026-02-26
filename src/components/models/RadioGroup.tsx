import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Chip from "@mui/material/Chip";
import type { RadioGroupProps } from "@mui/material/RadioGroup";

export default function RadioButtonsGroup(props: RadioGroupProps) {
  return (
    <FormControl sx={{ mt: 1 }}>
      <FormLabel>Priority</FormLabel>
      <RadioGroup
        row
        value={props.value || "LOW"}
        name="priority-radio-group"
        onChange={props.onChange}
      >
        <FormControlLabel
          value="LOW"
          control={<Radio />}
          label={<Chip label="Low" size="small" />}
        />
        <FormControlLabel
          value="MEDIUM"
          control={<Radio />}
          label={<Chip label="Medium" color="warning" size="small" />}
        />
        <FormControlLabel
          value="HIGH"
          control={<Radio />}
          label={<Chip label="High" color="error" size="small" />}
        />
      </RadioGroup>
    </FormControl>
  );
}
