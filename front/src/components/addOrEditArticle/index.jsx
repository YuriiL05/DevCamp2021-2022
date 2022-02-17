import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import AddOrEditArticleValidation from "../../propsValidation/AddOrEditArticleValidation";
import FormikAutocomplete from "../formsUI/formikAutocompleteField";
import { Image } from "@mui/icons-material";
import { useState } from "react";

export const AddOrEditArticle = ({ open, handleClose, submitArticle, article, accessLevels }) => {

  const [file, setFile] = useState(article?.File || null);

  const validationSchema = yup.object({
    Title: yup
      .string()
      .max(90, 'Maximum 90 characters')
      .required('Title is required'),
    Body: yup
      .string()
      .min(5, 'Minimum 5 characters')
      .required('Provide some text'),
    AccessLevel: yup
      .object()
      .nullable()
      .required('Required')
  });

  let initialValues = {
    Title: article?.Title || '',
    Body: article?.Body || '',
    AccessLevel: accessLevels.find(item => item.value === (article?.AccessLevelID || 1)),
    ...article,
  }

  const handleFile = (setFieldValue) => e => {
    e.preventDefault();
    const file = e.target.files[0];
    setFieldValue("file", file);

    if (file.type.match('image.*') && file.size < 10000000) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result);
      }
      reader.readAsDataURL(file);
    } else {
      console.error('Wrong file format or size!');
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>
          {!article && 'Add Article'}
          {article && 'Edit Article'}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={submitArticle}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <Box sx={{ flexGrow: 3 }} marginTop={2}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Field component={TextField}
                               name="Title"
                               label="Title"
                               fullWidth={true}
                               variant="outlined"/>
                      </Grid>
                      <Grid item xs={12}>
                        <Field component={TextField}
                               name="Body"
                               label="Text..."
                               fullWidth={true}
                               variant="outlined"
                               multiline rows={6}/>
                      </Grid>
                      <Grid item xs={2} marginLeft={3}>
                        <label htmlFor="icon-button-file">
                          <input accept="image/*" id="icon-button-file" type="file" name="file" hidden onChange={handleFile(setFieldValue)}/>
                          <IconButton color="primary" aria-label="upload picture" component="span">
                            <Image />
                          </IconButton>
                        </label>
                      </Grid>
                      <Grid item xs={4} >
                        {file && <img src={file} alt="NA"/>}
                      </Grid>
                      <Grid item xs={4} sx={{marginLeft: "auto"}}>
                        <Field component={FormikAutocomplete}
                               name="AccessLevel"
                               label="Visible to"
                               options={accessLevels} />
                      </Grid>
                    </Grid>
                    <DialogActions sx={{marginTop: 5}}>
                      <Button onClick={handleClose} variant="outlined" disabled={isSubmitting}
                              sx={{marginRight: "auto"}}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained" disabled={isSubmitting}>
                        {!article && 'Add'}
                        {article && 'Save'}
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
    </div>
  );
};

AddOrEditArticle.propTypes = AddOrEditArticleValidation;
