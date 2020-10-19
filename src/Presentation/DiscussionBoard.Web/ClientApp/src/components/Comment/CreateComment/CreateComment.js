import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
//import Spinner from '../../../../components/Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  iconColor: {
    color: theme.palette.text.secondary
  }
}));

const CreateComment = props => {

  const classes = useStyles();
  const {
    postId,
    createCommentLoading,
    createCommentError,
    onCreateComment,
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
        onCreateComment(values.content, postId);
        values = {
          content: ''
        };
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
              startIcon={<AddBoxIcon className={classes.iconColor} />}
            >
              <Typography color="textSecondary" display="inline" variant="body2">
                Comment
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
