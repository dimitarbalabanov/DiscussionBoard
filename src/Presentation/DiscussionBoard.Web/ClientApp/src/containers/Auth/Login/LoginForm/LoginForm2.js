import React from 'react';
import * as Yup from 'yup';
import { useFormikContext } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import JustForm from './JustForm'
import { makeStyles } from '@material-ui/core';
import { FormikTextField } from '../../../../components/Formik/FormikTextField';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginLeft: theme.spacing(6),
    // marginRight: theme.spacing(6)
  }
}));

const initialValues = {
  email: '',
  password: ''};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required')
})

const onSubmit = (values) => {
  console.log(values)
}

const LoginForm = props => {
  const classes = useStyles();
const asdf = useFormikContext();
console.log(asdf)
  const {
    onAuth
  } = props;

  const error = {
    email: "error for email",
    password: "error for password"
  };

  // dirty: false
  // errors: {}
  // getFieldHelpers: ƒ (name)
  // getFieldMeta: ƒ (name)
  // getFieldProps: ƒ (nameOrOptions)
  // handleBlur: ƒ ()
  // handleChange: ƒ ()
  // handleReset: ƒ ()
  // handleSubmit: ƒ ()
  // initialErrors: {}
  // initialStatus: undefined
  // initialTouched: {}
  // initialValues: {email: "admin@admin.admin", password: "Administrator"}
  // isSubmitting: false
  // isValid: true
  // isValidating: false
  // registerField: ƒ (name, _ref3)
  // resetForm: ƒ (nextState)
  // setErrors: ƒ (errors)
  // setFieldError: ƒ (field, value)
  // setFieldTouched: ƒ ()
  // setFieldValue: ƒ ()
  // setFormikState: ƒ (stateOrCb)
  // setStatus: ƒ (status)
  // setSubmitting: ƒ (isSubmitting)
  // setTouched: ƒ ()
  // setValues: ƒ ()
  // status: undefined
  // submitCount: 0
  // submitForm: ƒ ()
  // touched: {}
  // unregisterField: ƒ (name)
  // validateField: ƒ ()
  // validateForm: ƒ ()
  // validateOnBlur: true
  // validateOnChange: true
  // validateOnMount: false
  // values: {email: "admin@admin.admin", password: "Administrat
  
  return (
    <JustForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        onSubmit={onSubmit}
        buttonText={"Login"}
      >
        <Box mb={3}>
          <Typography color="textPrimary" variant="h2">
            Sign in
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Sign in on the internal platform
          </Typography>
        </Box>
        <FormikTextField
          formikKey="email"
          valError={error.email}
          type="email"
          label="Email Address"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <FormikTextField
          formikKey="password"
          valError={error.password}
          type="password"
          label="Password"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Box mt={22} mb={2}>
          <Button
            color="primary"
            //disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Login now
          </Button>
        </Box>
      </JustForm>
  );
};

export default LoginForm;
