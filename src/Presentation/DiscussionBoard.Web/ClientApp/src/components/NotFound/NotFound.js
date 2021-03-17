import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Page from '../Page/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  text: {
    marginBottom: theme.spacing(2)
  },
  icon: {
    display: 'flex',
    fontSize: '100px',
    margin: 'auto',
    color: theme.palette.primary.main
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Not Found">
      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" height="100%" justifyContent="center" m={5} p={5} component={Paper}>
          <SentimentVeryDissatisfiedIcon className={classes.icon}/>
          <Typography  className={classes.text} align="center" color="primary" variant="h2" >
            Sorry, the page you are looking for isn’t here
          </Typography>
        </Box>
      </Container>
    </Page>
  );
};

export default NotFound;
