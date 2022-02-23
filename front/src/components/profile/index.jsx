import ProfileValidation from "../../propsValidation/ProfileValidation";
import UserIcon from "../userIcon";
import { Box, Button, Grid, IconButton } from "@mui/material";
import * as React from "react";

import "./style.css";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import ReadOnlyField from "../formsUI/readOnlyField";

export const Profile = ({ user, universities, handleOpenEditProfile }) => {
  const { FirstName, LastName, Email, Phone, UniversityID } = user;
  const fullName = `${FirstName} ${LastName}`;
  //List of UniversityID and UniversityName
  const universityList = Object.assign( {}, ...universities.map(item => ({ [item.UnId]: item.UniversityName})) );

  const [avatarImg, setAvatarImg] = useState(user?.Avatar || '');

  const handleAvatarImg = () => e => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file.type.match('image.*') && file.size < 10000000) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarImg(reader.result);
      }
      reader.readAsDataURL(file);
    } else {
      console.error('Wrong file format or size!');
    }
  };

  return (
    <div className={"profile"}>
      <p>My Profile</p>
      <Box sx={{
        backgroundColor: 'white',
        padding: 3,
      }}
      >
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <UserIcon avatar={avatarImg} fullName={fullName} size={200}/>
          </Grid>
          <Grid item xs={1}>
            <label htmlFor="icon-button-file">
              <input accept="image/*" id="icon-button-file" type="file" name="avatar" hidden onChange={handleAvatarImg()}/>
              <IconButton color="primary" aria-label="upload picture" component="span">
                <Edit />
              </IconButton>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={handleOpenEditProfile}>Edit</Button>
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyField label="First Name" value={FirstName}/>
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyField label="Last Name" value={LastName}/>
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyField label="Email" value={Email}/>
          </Grid>
          <Grid item xs={12}>
            <ReadOnlyField label="Phone" value={Phone}/>
          </Grid>
          <Grid item xs={4}>
            <ReadOnlyField label="University" value={universityList[UniversityID]}/>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

Profile.propTypes = ProfileValidation;