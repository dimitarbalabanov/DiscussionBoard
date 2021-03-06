import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
import { createPost, fetchForums } from '../../store/actions';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

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
import ImageInput from '../../components/Forms/FileInput/FileInput';


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
    createPostError,
    createPostLoading,
    createPostId,
    onCreatePost,
    forumsById,
    allForumIds,
    onFetchForums,
    forumsLoading
  } = props;
  
  useEffect(() => {
    if (allForumIds.length < 10) {
      onFetchForums();
       }
  }, [onFetchForums])
  
  if(createPostSuccess) {
    return <Redirect to={`/posts/${createPostId}`} />
  }
  
  let form = ( 
    <Formik
      initialValues={{
        title: 'Neque porro quisquam est qui dolorem',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus venenatis mauris, at efficitur dolor accumsan eget. Quisque quis elit sit amet lectus porttitor convallis. Maecenas maximus nibh non sapien consectetur, a blandit arcu interdum. Aliquam in massa dui. Etiam sed sodales mi, eget iaculis erat. Etiam luctus id purus quis euismod. In porta a ex eget tristique.',
        forumId: '',
        image : null
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().min(3).max(200).required('Title is required'),
        content: Yup.string().min(30).max(2500).required('Content is required'),
        forumId: Yup.number().required('Selecting a forum is required')
        // image: Yup.mixed()
        //   .required("We need an Image!")
        //   .test(
        //     "fileSize",
        //     "Your video is too big :(",
        //     value => value && value.size <= 262144000
        // )
      })}
      onSubmit={values => {
        console.log(values)
        let formData = new FormData();
        formData.append('forumId', values.forumId);
        formData.append('title', values.title);
        formData.append('content', values.content);
        // formData.append("postMedia", values.image);
        //onCreatePost(values.forumId, values.title, values.content);
        onCreatePost(formData);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue,
        isValid
      }) => (
        <form onSubmit={handleSubmit} >
          <Typography component="h1" variant="h4" color="inherit" gutterBottom>
            Create Post
          </Typography>
            {forumsLoading ? <CircularProgress /> :
            <FormControl variant="outlined" size="small" className={classes.formControl}>
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
                {allForumIds.map(id => <MenuItem key={id} value={id}>{forumsById[id].title}</MenuItem>)}
              </Select>
            </FormControl>
            }
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
          <Field
              name="image"
              component={ImageInput}
              title="Upload"
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
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
              disabled={isSubmitting || !isValid}
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
    forumsById: state.entities.forums.byId,
    allForumIds: state.entities.forums.allIds,

    forumsLoading: state.ui.forums.forumsLoading,
    createPostLoading: state.ui.posts.createPostLoading,
    createPostError: state.ui.posts.createPostError,
     createPostSuccess: state.ui.posts.createPostSuccess,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchForums: () => dispatch(fetchForums()),
    //onCreatePost: (forumId, title, content) => dispatch(createPost(forumId, title, content))
    onCreatePost: (formData) => dispatch(createPost(formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);