import React from 'react';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
//import Spinner from '../../Spinner/Spinner';
import MainForm from '../../Forms/MainForm/MainForm';
import FormikTextField from '../../Forms/FormikTextField/FormikTextField';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1)
  },
  iconColor: {
    color: theme.palette.text.secondary
  }
}));

const validationSchema = Yup.object().shape({
  content: Yup.string().max(255).required('Content is required')
})

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

  return (
    <Grid item xs={12} md={12} className={classes.root}>
      <MainForm
        initialValues={{
          content: content
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          onUpdateComment(commentId, values.content);
          onClose();
        }}
      >
        <FormikTextField
          formikKey="content"
          label="What are your thoughts?"
          type="text"
          margin="normal"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="outlined"
          startIcon={<AddBoxIcon className={classes.iconColor} />}
        >
          <Typography color="textSecondary" display="inline" variant="body2">
            Save
          </Typography>
        </Button>
      </MainForm>
    </Grid>
  );
};

export default EditComment;
