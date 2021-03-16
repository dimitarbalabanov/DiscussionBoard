import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { createPost, fetchForums } from '../../store/actions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
import FormikSelectField from '../../components/Forms/FormikSelectField/FormikSelectField';
import FormikTextField from '../../components/Forms/FormikTextField/FormikTextField';
import FormikImageInput from '../../components/Forms/FormikImageInput/FormikImageInput';
import MainForm from '../../components/Forms/MainForm/MainForm';

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

const initialValues = {
  title: '',
  content: '',
  // title: 'Neque porro quisquam est qui dolorem',
  // content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus venenatis mauris, at efficitur dolor accumsan eget. Quisque quis elit sit amet lectus porttitor convallis. Maecenas maximus nibh non sapien consectetur, a blandit arcu interdum. Aliquam in massa dui. Etiam sed sodales mi, eget iaculis erat. Etiam luctus id purus quis euismod. In porta a ex eget tristique.',
  forumId: '',
  image : null
};

const validationSchema = 
  Yup.object().shape({
    title: Yup.string().min(3).max(200).required('Title is required'),
    content: Yup.string().min(30).max(2500).required('Content is required'),
    forumId: Yup.number().required('Selecting a forum is required'),
  // image: Yup.mixed().required("We need an Image!")
  //   .test(
  //     "fileSize",
  //     "Your image is too big",
  //     value => value && value.size <= 262144000)
  });

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
  
  const onSubmit = values => {
    console.log(values)
    var formData = new FormData();
    formData.append('forumId', values.forumId);
    formData.append('title', values.title);
    formData.append('content', values.content);
    //formData.append("postMedia", values.image);
    onCreatePost(values.forumId, values.title, values.content);
    //onCreatePost(formData);
  }

  useEffect(() => {
    onFetchForums();
  }, [onFetchForums])
  
  if(createPostSuccess) {
    return <Redirect to={`/posts/${createPostId}`} />
  }

  return (
    <Page className={classes.root} title={"Create Post"}>
        <Grid container justify="center">
          <Grid item component={Paper} xs={12} md={9} className={classes.form}>
            { createPostLoading 
              ? <Spinner /> 
              : <MainForm 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                buttonText={"Create"}
                >
                  {forumsLoading ? <CircularProgress /> :
                    <FormikSelectField
                      formikKey="forumId"
                      forums={forums}
                    />}
                <FormikImageInput
                    formikKey="image"
                  />
                <FormikTextField
                  formikKey="title"
                  valError={null}
                  type="text"
                  label="Title"
                  margin="normal"
                  variant="outlined"
                  size="small"
                  fullWidth
                  />
                  <FormikTextField
                    formikKey="content"
                    type="text"
                    label="Content"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={6}
                  />
              </MainForm> }
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
    //onCreatePost: (formData) => dispatch(createPost(formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);