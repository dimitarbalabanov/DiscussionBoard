import React from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';

const JustForm = props => {
  
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
          isValid,
          dirty
          }) => (
            <form onSubmit={handleSubmit}>
              { children }
              <Button
                  color="primary"
                  disabled={isSubmitting || !dirty || !isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {buttonText}
                </Button>
            </form>
          )
        }
      </Formik>
  );
};

export default JustForm;
