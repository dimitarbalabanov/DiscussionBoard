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


const CreatePost = props => {

  const classes = useStyles();
  
  const {
    handleClose,
    onCreatePost
  } = props;
  
  let form = ( 
    <Formik
      initialValues={{
        title: 'Neque porro quisquam est qui dolorem',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus venenatis mauris, at efficitur dolor accumsan eget. Quisque quis elit sit amet lectus porttitor convallis. Maecenas maximus nibh non sapien consectetur, a blandit arcu interdum. Aliquam in massa dui. Etiam sed sodales mi, eget iaculis erat. Etiam luctus id purus quis euismod. In porta a ex eget tristique.'
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().min(3).max(200).required('Title is required'),
        content: Yup.string().min(30).max(2500).required('Content is required')
      })}
      onSubmit={values => {
        const post = {
          title: values.title,
          content: values.content,
          forumId: props.forumId
        };
        values = {
          content: ''
        };
        props.handleClose();
        props.onCreatePost(post);
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
              Create Post
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
      <Box justifyContent="center">
      <Grid item xs={12} md={6} className={classes.root}>
        {form}
      </Grid>
      </Box>
    </Paper>
  );
};

export default CreatePost;
