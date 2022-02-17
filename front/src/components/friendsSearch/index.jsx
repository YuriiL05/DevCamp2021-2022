import * as React from "react";
import { SearchContainer } from "../../containers/profile/search";
import { Grid } from "@mui/material";

export const FriendsSearch = () => {
  return (
    <Grid container spacing={2} marginTop={3}>
      <Grid item xs={4}>
        Friends
      </Grid>
      <Grid item xs={8}>
        <SearchContainer/>
      </Grid>
    </Grid>
  )
};
