import React from 'react';
import { connect } from 'react-redux';
import { register } from '../../../store/actions';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Page from '../../../components/Page/Page';
import Spinner from '../../../components/Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Register = props => {
  const classes = useStyles();

  const {
    loading,
    error,
    isAuthenticated,
    onRegister
  } = props;

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  let form = <Spinner />

  if (!loading && !error) {
    form = (
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={
          Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            username: Yup.string().max(255).required('First name is required'),
            password: Yup.string().max(255).required('password is required'),
          })
        }
        onSubmit={values => {
          onRegister(values.email, values.password, values.confirmPassword, values.username);
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
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2" >
                Create new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.username && errors.username)}
              fullWidth
              helperText={touched.username && errors.username}
              label="Username"
              margin="normal"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              variant="outlined"
            />
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
            <TextField
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              fullWidth
              helperText={touched.confirmPassword && errors.confirmPassword}
              label="Confirm Password"
              margin="normal"
              name="confirmPassword"
              onBlur={handleBlur}
              onChange={handleChange}
              type="confirmPassword"
              value={values.confirmPassword}
              variant="outlined"
            />
            <Box my={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign up now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body1">
              Have an account?
              {' '}
              <Link
                component={RouterLink}
                to="/login"
                variant="h6"
              >
                Sign in
              </Link>
            </Typography>
          </form>
        )}
      </Formik>
    );
  }
  
  let errorMessage = null;
  if (error) {
    errorMessage = error.map(e =>
      <Box mt={3} mb={1}>
        <Typography align="center" color="error" variant="h3">
          {e}
        </Typography>
      </Box>
    );
  }

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          {form}
          {errorMessage}
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.register.loading,
    error: state.register.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (email, password, confirmPassword, username) => dispatch(register(email, password, confirmPassword, username))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);