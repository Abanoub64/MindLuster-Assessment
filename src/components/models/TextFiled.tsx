import TextField from "@mui/material/TextField";

interface TextFieldsProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextFields({
  placeholder,
  value,
  onChange,
}: TextFieldsProps) {
  return (
    <TextField
      fullWidth
      value={value}
      placeholder={placeholder}
      variant="outlined"
      onChange={onChange}
      sx={{ mb: 1 }}
    />
  );
}
