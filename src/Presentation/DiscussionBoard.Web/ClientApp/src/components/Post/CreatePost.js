import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Common/Page';
import TextEditor from '../../components/TextEditor/TextEditor';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));



const CreatePost = props => {
  const classes = useStyles();
  console.log(props.asdf)
  let form = ( 
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
         <Box mb={3}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              Create Post
            </Typography>
          </Box>
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
          type="text"
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

  // if (props.loading) {
  //   form = (
  //     <Box textAlign="center">
  //       <CircularProgress size={150} />
  //     </Box>
  //   );
  // }

  // let errorMessage = null;
  // if (props.error) {
  //   errorMessage = (
  //   <Box
  //     mt={3}
  //     mb={1}
  //   >
  //     <Typography
  //       align="center"
  //       color="error"
  //       variant="h3"
  //     >
  //       {props.error}
  //     </Typography>
  //   </Box>);
  // }

  return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography color="textPrimary"
              variant="h4" >Create Post</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          {form}
          <TextEditor />
        </Container>
      </Box>
        </AccordionDetails>
      </Accordion>
  );
};

export default CreatePost;
