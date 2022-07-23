import * as React from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import GoogleLogin from "react-google-login";
import PropTypes from "prop-types";

export const LoginLightBox = ({ openLogin, handleClickCloseLogin, handleGoogleAuth, handleGoogleAuthFail }) => {

  return (
        <Dialog open={openLogin} onClose={handleClickCloseLogin} maxWidth="lg">
          <DialogTitle>
            Sign in/up
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ flexGrow: 3 }} marginTop={2}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <GoogleLogin
                    clientId="842613543752-4usqgkbmvjes3n92i2fc73t4a7060ekc.apps.googleusercontent.com"
                    buttonText="Login / Sign Up"
                    onSuccess={handleGoogleAuth}
                    onFailure={handleGoogleAuthFail}
                    cookiePolicy={'single_host_origin'}
                  />
                </Grid>
                <Grid item xs={12}>
                  Facebook
                </Grid>
              </Grid>
              <IconButton
                aria-label="close"
                onClick={handleClickCloseLogin}
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
          </DialogContent>
        </Dialog>
  );
};

LoginLightBox.propTypes = {
  handleGoogleAuth: PropTypes.func.isRequired,
  handleGoogleAuthFail: PropTypes.func.isRequired,
  openLogin: PropTypes.bool.isRequired,
  handleClickCloseLogin: PropTypes.func.isRequired,
};
