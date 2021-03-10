import React from 'react';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MainForm from '../../Forms/MainForm/MainForm';
import FormikTextField from '../../Forms/FormikTextField/FormikTextField';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  }
}));

const initialValues = {
  content: ''
};

const validationSchema = Yup.object().shape(
  { content: Yup.string().max(255).required('Content is required')}
);

const CreateComment = props => {
  const classes = useStyles();
  
  const {
    postId,
    //createCommentLoading,
    //createCommentError,
    onCreateComment,
    isAuthenticated
  } = props;

  const onSubmit = values => {
    onCreateComment(values.content, postId);
    values = {
      content: ''
    };
  }

  return (
    <Grid item xs={12} md={12} className={classes.root}>
      <MainForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        buttonText={<Typography color="textSecondary" display="inline" variant="body2">
        Comment
      </Typography>}
      >
        <FormikTextField
          formikKey="content"
          label={!isAuthenticated ? "Please, login to comment..." : "What are your thoughts?"}
          disabled={!isAuthenticated}
          type="text"
          margin="normal"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
        {isAuthenticated ? 
          <Button
            // disabled={isSubmitting}
            type="submit"
            variant="outlined"
            startIcon={<AddBoxIcon  />}
          >
            <Typography color="textSecondary" display="inline" variant="body2">
              Comment
            </Typography>
          </Button> 
          : null}
      </MainForm>
    </Grid>
  );
};

export default CreateComment;
