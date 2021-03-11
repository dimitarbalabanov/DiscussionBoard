import React from 'react';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const MainForm = props => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    mt = 3,
    mb = 1,
    align = "center",
    hideBtn,
    btnColor = "primary",
    btnVariant = "contained",
    btnText,
    btnIcon,
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
            <form onSubmit={handleSubmit}>
              { children }
              {!hideBtn ? 
                <Box mt={mt} mb={mb} textAlign={align}>
                  <Button
                    type="submit"
                    color={btnColor}
                    size="large"
                    variant={btnVariant}
                    startIcon={btnIcon}
                    disabled={isSubmitting || !isValid}
                  >
                    {btnText}
                  </Button>
                </Box> : null}
            </form>
          )
        }
      </Formik>
  );
};

export default MainForm;
