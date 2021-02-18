import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Page from '../../../components/Page/Page';
import { register } from '../../../store/actions';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Spinner from '../../../components/Spinner/AnotherSpinner'

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
// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     height: '100%',
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3)
//   }
// }));

const Register = props => {
  const classes = useStyles();

  const {
    registerLoading,
    registerError,
    onRegister,
    isAuthenticated
  } = props;
  console.log(registerError)
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

let form = 
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
                Register now
              </Button>
            </Box>
          </form>
        )}
      </Formik>;

    return (
      <Page className={classes.root} title={"Sign up"}>
          <Grid container justify="center">
            <Grid item component={Paper} xs={12} md={6} className={classes.form}>
            {registerLoading ? <Spinner /> : form}
            {registerError ?? <div><Typography>{register.Error}</Typography></div>}
            </Grid>
          </Grid>
      </Page>
    );
};

const mapStateToProps = state => {
  return {
    registerLoading: state.register.loading,
    registerError: state.register.error,
    isAuthenticated: state.auth.token !== null,
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
