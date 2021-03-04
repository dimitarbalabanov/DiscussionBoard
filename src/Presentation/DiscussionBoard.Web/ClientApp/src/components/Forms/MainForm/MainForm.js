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
          isValid,
          dirty
          }) => (
            <form onSubmit={handleSubmit}>
              { children }
              <Box mt={3} mb={1}>
                <Button
                  color="primary"
                  disabled={isSubmitting || !isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {buttonText}
                </Button>
              </Box>
            </form>
          )
        }
      </Formik>
  );
};

export default MainForm;
