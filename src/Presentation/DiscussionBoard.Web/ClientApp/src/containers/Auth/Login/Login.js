import React  from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth } from '../../../store/actions';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import Page from '../../../components/Page/Page';
import MainForm from '../../../components/Forms/MainForm/MainForm';
import FormikTextField from '../../../components/Forms/FormikTextField/FormikTextField';
import Spinner from '../../../components/Spinner/AnotherSpinner';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    padding: theme.spacing(2)
  }
}));

const initialValues = {
  email: 'admin@admin.admin',
  password: 'Administrator'
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required')
})

const Login = props => {
  const classes = useStyles();
  
  const {
    loginError,
    loginLoading,
    isAuthenticated,
    onAuth
  } = props;
  
  const onSubmit = values => {
    onAuth(values.email, values.password);
  }

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Page title={"Login"}>
      <Grid container justify="center">
        <Grid item component={Paper} xs={12} md={6} className={classes.mainGrid}>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">
              Login
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Sign in on the internal platform
            </Typography>
          </Box>
          {loginLoading 
            ? 
              <Spinner /> 
            :
              <MainForm 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                buttonText={"login"}
              >
                <FormikTextField
                  formikKey="email"
                  valError={null}
                  type="email"
                  label="Email Address"
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
              </MainForm>
          }
          {loginError ?? <Typography>{loginError}</Typography>}
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