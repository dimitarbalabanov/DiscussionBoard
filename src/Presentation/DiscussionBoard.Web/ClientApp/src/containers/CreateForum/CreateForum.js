import React from 'react';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
//import { createForum } from '../../store/actions';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  
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

const CreateForum = props => {
  const classes = useStyles();
  const createForumLoading = false;
  //const {
    //createForumSuccess,
    //createForumError,
    //createForumLoading,
    //createForumId,
    //onCreateForum,
  //} = props;
  
  // if(createForumSuccess) {
  //   return <Redirect to={`/forums/${createForumId}`} />
  // }
  
  let form = ( 
    <Formik
      initialValues={{
        title: 'Neque porro quisquam est qui dolorem',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        description: ' Fusce dapibus venenatis mauris, at efficitur dolor accumsan eget. Quisque quis elit sit amet lectus porttitor convallis. Maecenas maximus nibh non sapien consectetur, a blandit arcu interdum. Aliquam in massa dui. Etiam sed sodales mi, eget iaculis erat. Etiam luctus id purus quis euismod. In porta a ex eget tristique.',
        color: '#123456',
        mediaFile: null,
        rules: ''
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().min(3).max(200).required('Title is required'),
        content: Yup.string().min(30).max(2500).required('Content is required'),
        //forumId: Yup.number().required('Selecting a forum is required')
        image: Yup.mixed()
          .required("We need an Image!")
          .test(
            "fileSize",
            "Your video is too big :(",
            value => value && value.size <= 262144000
        )
      })}
      onSubmit={values => {
        console.log(values)
        var formData = new FormData();
        formData.append('title', values.title);
        formData.append('subtitle', values.subtitle);
        formData.append('description', values.description);
        formData.append('color', values.color);
        formData.append("mediaFile", values.image);
        console.log(formData)
        //onCreateForum(values.forumId, values.title, values.content);
        //onCreateForum(formData);
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
            Create Forum
          </Typography>
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
            error={Boolean(touched.title && errors.title)}
            fullWidth
            helperText={touched.title && errors.title}
            label="Subtitle"
            margin="normal"
            name="subtitle"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.subtitle}
            variant="outlined"
            size="small"
          />
          <TextField
            error={Boolean(touched.content && errors.content)}
            fullWidth
            helperText={touched.content && errors.content}
            label="Description"
            margin="normal"
            name="description"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.description}
            variant="outlined"
            multiline
            rows={4}
          />
          <Field
              name="image"
              component={ImageInput}
              title="Upload"
              setFieldValue={setFieldValue}
              onBlur={handleBlur}
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
    <Page className={classes.root} title={"Create Forum"}>
        <Grid container justify="center">
          <Grid item component={Paper} xs={12} md={9} className={classes.form}>
            { createForumLoading ? <Spinner /> : form }
          </Grid>
        </Grid>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    // createForumLoading: state.forum.createForumLoading,
    // createForumError: state.forum.createForumError,
    // createForumSuccess: state.forum.createForumSuccess,
    // createForumId: state.forum.forum ? state.forum.forum.id : ''
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //onCreateForum: (formData) => dispatch(createForum(formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForum);