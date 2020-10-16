import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
//import Spinner from '../../../../components/Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  }
}));

const CreateComment = props => {

  const classes = useStyles();
  const {
    handleClose,
    
    postId,
    //createCommentLoading,
    //createCommentError,
    //createCommentSuccess,
    onCreateComment,
    //onCreateCommentReset
  } = props;

  let form = ( 
    <Formik
      initialValues={{
        content: ''
        // content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus venenatis mauris, at efficitur dolor accumsan eget. Quisque quis elit sit amet lectus porttitor convallis. Maecenas maximus nibh non sapien consectetur, a blandit arcu'
      }}
      validationSchema={Yup.object().shape({
        content: Yup.string().max(255).required('Content is required')
      })}
      onSubmit={values => {
        const comment = {
          content: values.content,
          postId: postId
        };

        values = {
          content: ''
        };
        handleClose();
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
          <TextField
            error={Boolean(touched.content && errors.content)}
            fullWidth
            helperText={touched.content && errors.content}
            label="What are your thoughts?"
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
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="outlined"
            >
            <Typography color="textSecondary" display="inline" variant="body2" >
              Delete
            </Typography>
            </Button>
        </form>
      )}
    </Formik>
  );
  
  return (
      <Grid item xs={12} md={12} className={classes.root}>
        {form}
      </Grid>
  );
};

export default CreateComment;
