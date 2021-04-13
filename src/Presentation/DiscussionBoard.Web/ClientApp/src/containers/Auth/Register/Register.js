import React from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Page from '../../../components/Page/Page';
import { register } from '../../../store/actions';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Spinner from '../../../components/Spinner/AnotherSpinner'
import MainForm from '../../../components/Forms/MainForm/MainForm';
import FormikTextField from '../../../components/Forms/FormikTextField/FormikTextField';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    padding: theme.spacing(2)
  }
}));

const initialValues = {
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  username: Yup.string().max(255).required('First name is required'),
  password: Yup.string().max(255).required('password is required'),
});

const Register = props => {
  const classes = useStyles();

  const {
    loading,
    error,
    onRegister,
    isAuthenticated
  } = props;
  
  const onSubmit = values => {
    onRegister(values.email, values.password, values.confirmPassword, values.username);
  }

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Page title={"Sign up"}>
        <Grid container justify="center">
          <Grid item component={Paper} xs={12} md={6} className={classes.mainGrid}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2" >
              Create your new account
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Use your email to create a new account
            </Typography>
          </Box>
          {loading 
          ? 
            <Spinner /> 
          :
            <MainForm 
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              btnText={"sign up"}
            >
              <FormikTextField
                formikKey="username"
                valError={null}
                type="text"
                label="Username"
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <FormikTextField
                formikKey="email"
                valError={null}
                type="email"
                label="Email"
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <FormikTextField
                formikKey="password"
                valError={null}
                type="password"
                label="Password"
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <FormikTextField
                formikKey="confirmPassword"
                valError={null}
                type="password"
                label="Confirm password"
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </MainForm>
        }
          {error ?? <div><Typography>{error}</Typography></div>}
          
          </Grid>
        </Grid>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.registerLoading,
    error: state.auth.registerError,
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
