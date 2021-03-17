import React from 'react';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MainForm from '../../Forms/MainForm/MainForm';
import FormikTextField from '../../Forms/FormikTextField/FormikTextField';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(5),
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
    username,
    isAuthenticated
  } = props;

  const onSubmit = values => {
    onCreateComment(values.content, postId, username);
    values = {
      content: ''
    };
  }

  return (
    <Box className={classes.root}>
      <MainForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        btnText={
          <Typography color="textSecondary" display="inline" variant="body2">
            Comment
          </Typography>
        }
        btnVariant={"outlined"}
        btnIcon={<AddBoxIcon  />}
        mt={0}
        mb={0}
        align="left"
        hideBtn={!isAuthenticated}
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
      </MainForm>
    </Box>
  );
};

export default CreateComment;
