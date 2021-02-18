import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
import Page from '../Page/Page';
import { Link as RouterLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  text: {
    marginBottom: theme.spacing(2)
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Not Found">
      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" height="100%" justifyContent="center" m={5} p={5} component={Paper}>
          <Typography  className={classes.text} align="center" color="textPrimary" variant="h1" >
            Sorry, the page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2" >
            Try using the navigation or go to 
          <Button
            className={classes.button}
            component={RouterLink}
            to='/'
            color="textPrimary"
            variant="outlined"
            type="submit"
            size="small"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
          </Typography>
        </Box>
      </Container>
    </Page>
  );
};

export default NotFound;
