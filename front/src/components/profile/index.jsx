import ProfileValidation from "../../propsValidation/ProfileValidation";
import { Formik, Form } from "formik";
import { UserIcon } from "../userIcon";
import { Button, Grid, IconButton } from "@mui/material";
import TextFieldForm from "../formsUI/textField";
import ListFieldForm from "../formsUI/listField";
import * as React from "react";
import * as yup from "yup";

import "./style.css";
import { Edit } from "@mui/icons-material";
import { useState } from "react";

export const Profile = ({ user, universities, updateProfile }) => {
  const { FirstName, LastName } = user;
  const fullName = `${FirstName} ${LastName}`;
  //List of UniversityID and UniversityName
  const universityList = Object.assign( {}, ...universities.map(item => ({ [item.UnId]: item.UniversityName})) );

  const [avatarImg, setAvatarImg] = useState(user?.Avatar || '');

  const handleAvatarImg = (setFieldValue) => e => {
    e.preventDefault();
    const file = e.target.files[0];
    setFieldValue("avatar", file);

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

  const validationSchema = yup.object({
    FirstName: yup
      .string()
      .max(128, 'Maximum 128 characters')
      .required('Required'),
    LastName: yup
      .string()
      .max(129, 'Maximum 129 characters')
      .required('Required'),
    Email: yup
      .string()
      .email('Incorrect Email')
      .required('Required'),
    Phone: yup
      .string()
      .matches(/^\+380\d{9}$/, 'Incorrect Phone number format (+380xxxxxxx)')
      .required('Required (+380xxxxxxx)'),
    UniversityID: yup
      .number()
      .required('Required')
  });

  let initialValues = {
    FirstName: user?.FirstName || '',
    LastName: user?.LastName || '',
    Email: user?.Email || '',
    Phone: user?.Phone || '',
    avatar: user?.Avatar || '',
    UniversityID: user?.UniversityID || '',
  }

  return (
    <div className={"profile"}>
      <p>My Profile</p>
      <Formik
        initialValues={initialValues}
        onSubmit={updateProfile}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className={"profileForm"}>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <UserIcon avatar={avatarImg} fullName={fullName} size={200}/>
                  </Grid>
                  <Grid item xs={1}>
                    <label htmlFor="icon-button-file">
                      <input accept="image/*" id="icon-button-file" type="file" name="avatar" hidden onChange={handleAvatarImg(setFieldValue)}/>
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <Edit />
                      </IconButton>
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldForm name="FirstName" label="First Name"/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldForm name="LastName" label="Last Name"/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldForm name="Email" label="Email" disabled/>
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldForm name="Phone" label="Phone" helperText="+380xxxxxxx"/>
                  </Grid>
                  <Grid item xs={4}>
                    <ListFieldForm name="UniversityID" options={universityList} label="University"/>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>Save</Button>
                  </Grid>
                </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

Profile.propTypes = ProfileValidation;