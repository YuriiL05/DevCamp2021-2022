import ProfileValidation from "../../../propsValidation/ProfileValidation";
import { Formik, Form } from "formik";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import TextFieldForm from "../../formsUI/textField";
import ListFieldForm from "../../formsUI/listField";
import * as React from "react";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";

export const UpdateProfile = ({ user, universities, updateProfile, open, handleClose }) => {
  //List of UniversityID and UniversityName
  const universityList = Object.assign( {}, ...universities.map(item => ({ [item.UnId]: item.UniversityName})) );

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
    UniversityID: user?.UniversityID || '',
  }

  return (
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>
          Edit Profile
        </DialogTitle>
        <DialogContent>
      <Formik
        initialValues={initialValues}
        onSubmit={updateProfile}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className={"profileForm"}>
            <Box sx={{
              backgroundColor: 'white',
              padding: 3,
            }}
            >
                <Grid container spacing={3}>
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
                </Grid>
              <DialogActions sx={{marginTop: 5}}>
                <Button onClick={handleClose} variant="outlined" disabled={isSubmitting}
                        sx={{marginRight: "auto"}}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  Save
                </Button>
              </DialogActions>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              </Box>
          </Form>
        )}
      </Formik>
        </DialogContent>
      </Dialog>
  );
};

UpdateProfile.propTypes = ProfileValidation;