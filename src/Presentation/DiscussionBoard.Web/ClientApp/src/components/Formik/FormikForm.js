import React from 'react';
import Formik from "formik";

export const FormikForm = (props) => {
  const {
    initialValues,
    validationSchema,
    onSubmit
  } = props;
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
          onCreateComment(values.content, postId);
          values = {
            content: ''
          };
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
          <form onSubmit={handleSubmit} >
            
            <TextField
              formikKey="email"
              //error={Boolean(values.content && errors.content)}
              fullWidth
              //helperText={touched.content && errors.content}
              label={!isAuthenticated ? "Please, login to comment..." : "What are your thoughts?"}
              disabled={!isAuthenticated}
              margin="normal"
              //name="content"
              onBlur={handleBlur}
              //onChange={handleChange}
              type="content"
              //value={values.content}
              variant="outlined"
              multiline
              rows={4}
            />
            
              {isAuthenticated ? 
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="outlined"
                  startIcon={<AddBoxIcon className={classes.iconColor} />}
                >
                  <Typography color="textSecondary" display="inline" variant="body2">
                    Comment
                  </Typography>
                </Button> 
                : null}
          </form>
        )}
      </Formik>
  );
}