import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus venenatis mauris, at efficitur dolor accumsan eget. Quisque quis elit sit amet lectus porttitor convallis. Maecenas maximus nibh non sapien consectetur, a blandit arcu'
      }}
      validationSchema={Yup.object().shape({
        content: Yup.string().max(255).required('content is required')
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
  
  return (
    <Paper>
      <Grid item xs={12} md={6} className={classes.root}>
        {form}
      </Grid>
    </Paper>
  );
};

export default CreateComment;
