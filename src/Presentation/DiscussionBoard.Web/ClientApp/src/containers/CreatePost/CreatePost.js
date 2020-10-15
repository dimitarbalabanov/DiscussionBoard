import React from 'react';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Page from '../../components/Page/Page';
import { createPost, createPostReset } from '../../store/actions';
import * as Yup from 'yup';
import { Formik } from 'formik';
import TextEditor from '../../components/TextEditor/TextEditor'

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
}));

const CreatePost = props => {
  const classes = useStyles();

  //const { forumId } = props.match.params;

  // const {
  //   createPostSuccess,
  //   createPostError,
  //   onFetchForum,
  //   onCreatePost,
  //   onCreatePostReset,
  //   newPostId,
  // } = props;
  
  // if(createPostSuccess) {
  //   onCreatePostReset();
  //   return <Redirect to={`/posts/${newPostId}`} />
  // }

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
        // const post = {
        //   title: values.title,
        //   content: values.content,
        //   forumId: props.forumId
        // };
        values = {
          content: ''
        };
        props.handleClose();
        //props.onCreatePost(post);
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
          <TextEditor />
          {/* <TextField
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
          /> */}
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

  // if (!forumLoading && forum) {
  //   forumDiv = (
  //     <React.Fragment>
  //       <ToggleShowButton 
  //           title={"Add a post"} 
  //           component={CreatePost}
  //           forumId={forumId} 
  //           loading={createPostLoading} 
  //           onCreatePost={onCreatePost}
  //       />
  //       <ForumHeading forum={forum} />
  //       <Grid container spacing={4}>
  //         {forum.posts.map((post) => (
  //           <PostCard key={post.id} post={post} />
  //         ))}
  //       </Grid>
  //     </React.Fragment>
  //   );
  // }

  return (
    <Page className={classes.root} title={"Create Post"}>
        <Grid item xs={12} md={9} component={Paper}>
          {/* { createPostError ? <StatusSnackbar message={createPostError} type={"error"} reset={onCreatePostReset}/> : null }
          { forumError ? <StatusSnackbar message={forumError} type={"error"} reset={() => {}}/> : null } */}
          {/* { createPostSuccess ? <StatusSnackbar message="Successfully created a post." type={"success"} reset={onCreatePostReset} /> : null } */}
          { form }
        </Grid>
        {/* <ForumSidebar /> */}
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    createPostLoading: state.post.createPostLoading,
    createPostError: state.post.createPostError,
    createPostSuccess: state.post.createPostSuccess,
    newPostId: state.post.newPostId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreatePost: (post) => dispatch(createPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);