import * as React from 'react';
import { Formik, Form } from 'formik';
import { ListField } from 'formik-mui';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import TextFieldForm from "../formsUI/textField";
import './style.css';
import ListFieldForm from "../formsUI/listField";
import AddOrEditArticleValidation from "../../propsValidation/AddOrEditArticleValidation";

export const AddOrEditArticle = ({ open, handleClose, submitArticle, article }) => {

  const validationSchema = yup.object({
    Title: yup
      .string()
      .required('Title is required'),
    Body: yup
      .string()
      .min(5, 'Minimum 5 characters')
      .required('Provide some text'),
    AccessLevelID: yup
      .number()
      .required('Required')
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{!article && 'Add Article'}{article && 'Edit Article'}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={article || { Title: '', Body: '', AccessLevelID: 1 }}
            onSubmit={submitArticle}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box sx={{ flexGrow: 3 }}>
                  <div className={"formFields"}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextFieldForm name="Title" label="Title"/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextFieldForm name="Body" label="Text..." multiline rows={6}/>
                      </Grid>
                      <Grid item xs={4}>
                        <ListFieldForm name="AccessLevelID" options={{
                          1: "All",
                          2: "Friends",
                          3: "Only Me"
                        }} label="Visible for"/>
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <Button type="submit" variant="contained" disabled={isSubmitting}>{!article && 'Add'}{article && 'Save'}</Button>
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
                  </div>
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
