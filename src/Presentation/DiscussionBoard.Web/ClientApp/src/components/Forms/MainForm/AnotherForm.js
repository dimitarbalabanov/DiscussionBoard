import React from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const MainForm = props => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    buttonText,
    children
  } = props;

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
      >
        {({
          handleSubmit,
          isSubmitting,
          isValid
          }) => (
            <form id="my-form" onSubmit={handleSubmit}>
              { children }
              
            </form>
          )
        }
      </Formik>
  );
};

export default MainForm;
