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


const UpdatePost = props => {

  const classes = useStyles();
  
  const {
    handleClose,
    postId,
    currentTitle,
    currentContent,
    onUpdatePost
  } = props;
  
  let form = ( 
    <Formik
      initialValues={{
        title: currentTitle,
        content: currentContent
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().min(3).max(200).required('Title is required'),
        content: Yup.string().min(30).max(2500).required('Content is required')
      })}
      onSubmit={values => {
        const newContent = {
          title: values.title,
          content: values.content
        };

        values = {
          title: '',
          content: ''
        };

        //handleClose();
        onUpdatePost(postId, newContent);
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
              Update Post
            </Typography>
          </Box>
          <TextField
            error={Boolean(touched.title && errors.title)}
            fullWidth
            helperText={touched.title && errors.title}
            label="Title"
            margin="normal"
            name="title"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.title}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.content && errors.content)}
            fullWidth
            helperText={touched.content && errors.content}
            label="Content"
            margin="normal"
            name="content"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
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
              Update
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
      <Box justifyContent="center">
      <Grid item xs={12} md={6} className={classes.root}>
        {form}
      </Grid>
      </Box>
    </Paper>
  );
};

export default UpdatePost;
