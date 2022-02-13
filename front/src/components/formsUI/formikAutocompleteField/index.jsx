import React from 'react';
import { fieldToTextField } from 'formik-mui';
import { Autocomplete, TextField } from "@mui/material";

const FormikAutocomplete = (props) => {
  const { form: { setTouched, setFieldValue } } = props;
  const { error, label, helperText, ...field } = fieldToTextField(props);
  const { name } = field;

  return (
    <Autocomplete
      {...props}
      {...field}
      getOptionLabel={option => option.label}
      onChange={ (_, value) => setFieldValue(name, value) }
      onBlur={ () => setTouched({ [name]: true }) }
      renderInput={ props =>
        <TextField {...props} helperText={helperText} label={label} error={error} />
      }
    />
  );
}

export default FormikAutocomplete;
