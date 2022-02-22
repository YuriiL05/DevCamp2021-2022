import { TextField } from "@mui/material";

const ReadOnlyField = ({ ...props }) => {

  const readOnlyProps= {
    ...props,
    fullWidth: true,
    variant: 'outlined',
    InputProps: {
      readOnly: true
    }
  };

  return (
    <TextField {...readOnlyProps} />
  );
};

export default ReadOnlyField;
