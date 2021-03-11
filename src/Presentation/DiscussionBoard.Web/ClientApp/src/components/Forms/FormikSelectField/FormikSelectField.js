import React from 'react';
import { useField } from 'formik';
import { makeStyles } from '@material-ui/core';
import MenuItem  from '@material-ui/core/MenuItem';
import Select  from '@material-ui/core/Select';
import InputLabel  from '@material-ui/core/InputLabel';
import FormControl  from '@material-ui/core/FormControl';
import FormHelperText  from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 180,
  }
}));

const FormikSelectField = ({ formikKey, valError, forums, ...props }) => {
  const classes = useStyles();
  const [field, meta, helpers] = useField(formikKey);

  console.log(meta)
  return (
    <FormControl variant="outlined" size="small" className={classes.formControl}>
      <InputLabel id="forum">Forum</InputLabel>
      <Select
        labelId="forum"
        label="Forum"
        name={field.name}
        value={field.value}
        onBlur={field.onBlur}
        onChange={field.onChange}
        error={meta.touched && (Boolean(meta.error) || valError)}
        {...props}
      >
        {forums.map(forum => <MenuItem key={forum.id} value={forum.id}>{forum.title}</MenuItem>)}
      </Select>
      {meta.touched && Boolean(meta.error) || valError ?
        <FormHelperText error={true}>
          {meta.error ? meta.error : valError ? valError : ""}
        </FormHelperText>
       : null}
    </FormControl>
  );
}

export default FormikSelectField;