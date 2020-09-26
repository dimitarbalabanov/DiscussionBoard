import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../../store/actions';
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

const Login = props => {
  const classes = useStyles();

  const {
    loading,
    error,
    onAuth,
    isAuthenticated
  } = props;

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  let form = <Spinner />;

  if(!loading && !error) {
    form = (
      <Formik
        initialValues={{
          email: 'dohn@doe.com',
          password: 'JohnDoe'
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
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography color="textPrimary" variant="h2">
                  Sign in
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Sign in on the internal platform
                </Typography>
              </Box>
              <Box mt={3} mb={1}>
                <Typography align="center" color="textSecondary" variant="body1">
                  or login with email address
                </Typography>
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
              {errorMessage}
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1">
                Don&apos;t have an account?
                {' '}
                <Link 
                  component={RouterLink}
                  to="/register"
                  variant="h6"
                >
                  Sign up
                </Link>
              </Typography>
            </form>
          )
        }
      </Formik>
    )
  };

  let errorMessage = null;
  if (error) {
    errorMessage = 
      <Box mt={3} mb={1}>
        <Typography align="center" color="error" variant="h3">
          {error}
        </Typography>
      </Box>;
  }

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          {form}
        </Container>
      </Box>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
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