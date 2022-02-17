import React from 'react';
import { Autocomplete, TextField } from "@mui/material";

const AutocompleteUserSearch = (props) => {
  const { setUser } = props;

  return (
    <Autocomplete
      {...props}
      getOptionLabel={option => (option.FirstName + ' ' + option.LastName)}
      onChange={ (_, value) => setUser(value) }
      renderInput={ props =>
        <TextField {...props} label='Search user'/>
      }
    />
  );
}

export default AutocompleteUserSearch;
