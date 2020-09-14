import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { Link as RouterLink, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  CircularProgress,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';

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

  let form = (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: ''
      }}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          username: Yup.string().max(255).required('First name is required'),
          password: Yup.string().max(255).required('password is required'),
        })
      }
      onSubmit={values => {
        props.onRegister(values.email, values.password, values.username);
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
            <Typography
              color="textPrimary"
              variant="h2"
            >
              Create new account
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
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
          <Typography
            color="textSecondary"
            variant="body1"
          >
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

  if (props.isAuthenticated) {
    return <Redirect to='/' />;
  }

  if (props.loading) {
    form = (
      <Box textAlign="center">
        <CircularProgress size={150} />
      </Box>
    );
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = props.error.map(e =>
    <Box
      mt={3}
      mb={1}
    >
      <Typography
        align="center"
        color="error"
        variant="h3"
      >
        {e}
      </Typography>
    </Box>);
  }

  if (props.isAuthenticated) {
    return <Redirect to='/' />
  };

  return (
    <Page
      className={classes.root}
      title="Register"
    >
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
    onRegister: (email, password, username) => dispatch(actions.register(email, password, username))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
