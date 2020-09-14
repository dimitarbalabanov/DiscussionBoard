import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import { PinDropSharp } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';


const CreatePostModal = props => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              title: 'Enter title',
              content: 'Enter content'
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().max(255).required('title is required'),
              content: Yup.string().max(255).required('content is required')
            })}
            onSubmit={values => {
              const post = {
                title: values.title,
                content: values.content,
                forumId: props.forumId
              };

              props.onCreatePost(post);
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
              <form onSubmit={handleSubmit}>
                <TextField
                  error={Boolean(touched.title && errors.title)}
                  fullWidth
                  helperText={touched.title && errors.title}
                  label="Title"
                  margin="normal"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="title"
                  value={values.title}
                  variant="outlined"
                />
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
                />
                <Box my={2}>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleClose} 
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Create
                    </Button>
                  </DialogActions>
                </Box>
              </form>
              )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreatePostModal;