import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Page from '../Page/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="404">
      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" height="100%" justifyContent="center" m={5} p={5} component={Paper}>
          <NotInterestedIcon></NotInterestedIcon>
          <Typography align="center" color="textPrimary" variant="h1" >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2" >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation.
          </Typography>
        </Box>
      </Container>
    </Page>
  );
};

export default NotFound;
