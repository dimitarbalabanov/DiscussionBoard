import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  
  let form = ( 
    <Formik
      initialValues={{
        title: 'Enter title',
        content: 'Enter content'
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().min(3).max(200).required('title is required'),
        content: Yup.string().min(30).max(2500).required('content is required')
      })}
      onSubmit={values => {
        const post = {
          title: values.title,
          content: values.content,
          forumId: props.forumId
        };
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
      <Grid item xs={12} md={6} className={classes.root}>
        {form}
      </Grid>
    </Paper>
  );
};

export default CreatePost;
