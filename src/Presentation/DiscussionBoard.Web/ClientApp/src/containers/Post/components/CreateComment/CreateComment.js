import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  }
}));

const CreateComment = props => {

  const classes = useStyles();
  const {
    postId,
    onCreateComment
  } = props;

  let form = ( 
    <Formik
      initialValues={{
        content: 'Enter content'
      }}
      validationSchema={Yup.object().shape({
        content: Yup.string().max(255).required('content is required')
      })}
      onSubmit={values => {
        const comment = {
          content: values.content,
          postId: postId
        };

        onCreateComment(comment);
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
          <Box mb={3}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Create Comment
            </Typography>
          </Box>
          <TextField
            error={Boolean(touched.content && errors.content)}
            fullWidth
            helperText={touched.content && errors.content}
            label="Content"
            margin="normal"
            name="content"
            onBlur={handleBlur}
            onChange={handleChange}
            type="content"
            value={values.content}
            variant="outlined"
            multiline
            rows={4}
          />
          <Box my={2}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Create
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );

  // if (props.loading) {
  //   );
  // }

  // if (props.error) {
  // }

  return (
    <Paper>
      <Grid item xs={12} md={6} className={classes.root}>
        {form}
      </Grid>
    </Paper>
  );
};

export default CreateComment;
