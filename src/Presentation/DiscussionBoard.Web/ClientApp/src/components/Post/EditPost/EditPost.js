import React from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MainForm from '../../Forms/MainForm/MainForm';
import FormikTextField from '../../Forms/FormikTextField/FormikTextField';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1)
  }
}));

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(200).required('Title is required'),
  content: Yup.string().min(30).max(2500).required('Content is required'),
});

const EditPost = props => {

  const classes = useStyles();
  const {
    id,
    title,
    content,
    onClose,
    onUpdatePost
  } = props;

  console.log(props);
  
  const initialValues= {
    title: title,
    content: content
  };

  const onSubmit = values => {
    onUpdatePost(id, values.title, values.content);
    console.log(values)
    onClose();
  };

  return (
    <Grid item xs={12} md={12} className={classes.root}>
      <MainForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        btnText={
          <Typography color="textSecondary" display="inline" variant="body2">
            Save
          </Typography>
        }
        btnVariant={"outlined"}
        btnIcon={<AddBoxIcon  />}
        mt={0}
        mb={0}
        align="left"
      >
        <FormikTextField
          formikKey="title"
          label={"Title"}
          type="text"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <FormikTextField
          formikKey="content"
          label={"Content"}
          type="text"
          margin="normal"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
      </MainForm>
    </Grid>
  );
};

export default EditPost;
