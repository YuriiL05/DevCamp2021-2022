import ProfileValidation from "../../propsValidation/ProfileValidation";
import { Formik, Form, Field } from "formik";
import { UserIcon } from "../userIcon";
import { Alert, Button, Grid } from "@mui/material";
import TextFieldForm from "../formsUI/textField";
import ListFieldForm from "../formsUI/listField";
import * as React from "react";
import * as yup from "yup";

import "./style.css";

export const Profile = ({ user, universities, updateProfile }) => {
  const { FirstName, LastName, Email, Phone, Avatar, UniversityID } = user;
  const fullName = `${FirstName} ${LastName}`;

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
      .matches(/^\+380\d{9}$/, 'Incorrect Phone number format')
      .required('Required'),
    Avatar: yup
      .string()
      .required('Required (+380xxxxxxx)'),
    UniversityID: yup
      .number()
      .required('Required')
  });

  return (
    <div className={"profile"}>
      <h4>My Profile</h4>
      <Formik
        initialValues={{ FirstName, LastName, Email, Phone, Avatar, UniversityID} }
        onSubmit={updateProfile}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className={"profileForm"}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <UserIcon avatar={Avatar} fullName={fullName} size={200}/>
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
                    <ListFieldForm name="UniversityID" options={{
                      1: "SumDU",
                      2: "SumPU",
                      3: "KPI"
                    }} label="University"/>
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