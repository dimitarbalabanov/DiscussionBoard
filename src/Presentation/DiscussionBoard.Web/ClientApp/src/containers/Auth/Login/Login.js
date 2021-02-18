import React  from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Page from '../../../components/Page/Page';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { auth } from '../../../store/actions';
import Spinner from '../../../components/Spinner/AnotherSpinner'

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  form: {
    padding: theme.spacing(2)
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 180,
  }
}));

const Login = props => {
  const classes = useStyles();

  const {
    loginError,
    loginLoading,
    isAuthenticated,
    onAuth
  } = props;
  
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  let form = ( 
    <Formik
        initialValues={{
          email: 'admin@admin.admin',
          password: 'Administrator'
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={values => {
          onAuth(values.email, values.password);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
          }) => (
            <form onSubmit={handleSubmit} className={classes.root}>
              <Box mb={3}>
                <Typography color="textPrimary" variant="h2">
                  Login
                </Typography>
                {/* <Typography color="textSecondary" gutterBottom variant="body2">
                  Sign in on the internal platform
                </Typography> */}
              </Box>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <Box mt={2} mb={2}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Login now
                </Button>
              </Box>
            </form>
          )
        }
      </Formik>
  );

  return (
    <Page className={classes.root} title={"Create Post"}>
        <Grid container justify="center">
          <Grid item component={Paper} xs={12} md={6} className={classes.form}>
          {loginLoading ? <Spinner /> : form}
          {loginError ?? <div><Typography>{loginError}</Typography></div>}
          </Grid>
        </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    loginLoading: state.auth.loading,
    loginError: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);