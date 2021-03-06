import React from 'react';
import { useField } from "formik";
import TextField  from '@material-ui/core/TextField';

const FormikTextField = ({ formikKey, valError, ...props }) => {
  const [field, meta, helpers] = useField(formikKey);

  return <TextField
    name={field.name}
    value={field.value}
    onBlur={field.onBlur}
    onChange={field.onChange}
    helperText={meta.touched ? meta.error || valError : ""}
    error={meta.touched && (Boolean(meta.error) || valError)}
    {...props}
  />
}

export default FormikTextField;
// 0:
// name: "email"
// onBlur: ƒ ()
// onChange: ƒ ()
// value: "admin@admin.admin"
// 1:
// error: undefined
// initialError: undefined
// initialTouched: false
// initialValue: "admin@admin.admin"
// touched: false
// value: "admin@admin.admin"
// 2:
// setError: ƒ setError(value)
// setTouched: ƒ setTouched(value, shouldValidate)
// setValue: ƒ setValue(value, shouldValidate)