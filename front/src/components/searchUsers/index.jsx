import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";

export const SearchUsers = ({ users, setUser }) => {
  return (
    <>
      <Autocomplete
        options={users}
        getOptionLabel={option => (option.FirstName + ' ' + option.LastName)}
        onChange={ (_, value) => setUser(value) }
        renderInput={ props =>
          <TextField {...props} label='Search user' fullWidth={true} />
        }
      />
    </>
  )
};

SearchUsers.propTypes = {
  users: PropTypes.array,
  setUser: PropTypes.func.isRequired
};
