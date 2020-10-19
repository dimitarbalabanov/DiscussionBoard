import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Spinner from '../../Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1)
    // paddingLeft: theme.spacing(3),
    // paddingRight: theme.spacing(3),
    // marginBottom: theme.spacing(3),
  },
  iconColor: {
    color: theme.palette.text.secondary
  }
}));

const EditComment = props => {

  const classes = useStyles();
  const {
    // postId,
    // createCommentLoading,
    // createCommentError,
    // onCreateComment,
    commentId,
    onUpdateComment,
    content,
    onClose
  } = props;

  let form = ( 
    <Formik
      initialValues={{
        content: content
      }}
      validationSchema={Yup.object().shape({
        content: Yup.string().max(255).required('Content is required')
      })}
      onSubmit={values => {
        onUpdateComment(commentId, values.content);
        onClose();
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
              onClick={onClose}
            >
              <Typography color="textSecondary" display="inline" variant="body2">
                Cancel
              </Typography>
            </Button>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="outlined"
              startIcon={<AddBoxIcon className={classes.iconColor} />}
            >
              <Typography color="textSecondary" display="inline" variant="body2">
                Save
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

export default EditComment;
