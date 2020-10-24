import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
import { createPost, fetchForums } from '../../store/actions';
import * as Yup from 'yup';
import { Formik } from 'formik';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  form: {
    padding: theme.spacing(2)
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 180,
  }
}));

const CreatePost = props => {
  const classes = useStyles();

  const {
    createPostSuccess,
    //createPostError,
    createPostLoading,
    createPostId,
    onCreatePost,
    forums,
    onFetchForums,
    forumsLoading
  } = props;
  
  useEffect(() => {
    onFetchForums();
  }, [onFetchForums])
  
  if(createPostSuccess) {
    return <Redirect to={`/posts/${createPostId}`} />
  }
  
  let form = ( 
    <Formik
      initialValues={{
        title: 'Neque porro quisquam est qui dolorem',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus venenatis mauris, at efficitur dolor accumsan eget. Quisque quis elit sit amet lectus porttitor convallis. Maecenas maximus nibh non sapien consectetur, a blandit arcu interdum. Aliquam in massa dui. Etiam sed sodales mi, eget iaculis erat. Etiam luctus id purus quis euismod. In porta a ex eget tristique.',
        forumId: ''
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().min(3).max(200).required('Title is required'),
        content: Yup.string().min(30).max(2500).required('Content is required'),
        forumId: Yup.number().required('Selecting a forum is required'),
      })}
      onSubmit={values => {
        onCreatePost(values.forumId, values.title, values.content);
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
          <Typography component="h1" variant="h4" color="inherit" gutterBottom>
            Create Post
          </Typography>
          <FormControl variant="outlined" size="small" className={classes.formControl}>
            {forumsLoading ? <CircularProgress /> :
            <React.Fragment>
              <InputLabel id="forum">Forum</InputLabel>
              <Select
                labelId="forum"
                value={values.forumId}
                error={Boolean(touched.forumId && errors.forumId)}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Forum"
                name="forumId"
              >
                {forums.map(forum => <MenuItem key={forum.id} value={forum.id}>{forum.title}</MenuItem>)}
              </Select>
            </React.Fragment>
            }
          </FormControl>
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
            size="small"
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
            rows={6}
          />
          <Box my={2} align="center">
            <Button
              color="primary"
              disabled={isSubmitting}
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

  return (
    <Page className={classes.root} title={"Create Post"}>
        <Grid container justify="center">
          <Grid item component={Paper} xs={12} md={9} className={classes.form}>
            { createPostLoading ? <Spinner /> : form }
          </Grid>
        </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    forums: state.forums.forums,
    forumsLoading: state.forums.loading,
    createPostLoading: state.post.createPostLoading,
    createPostError: state.post.createPostError,
    createPostSuccess: state.post.createPostSuccess,
    createPostId: state.post.post ? state.post.post.id : ''
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(fetchForums()),
    onCreatePost: (forumId, title, content) => dispatch(createPost(forumId, title, content))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);