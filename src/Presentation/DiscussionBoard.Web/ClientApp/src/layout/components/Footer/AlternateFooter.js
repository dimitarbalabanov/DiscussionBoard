import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

const AlternateFooter = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Title
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Created with love for the people who love to engage in discussions.
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

AlternateFooter.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default AlternateFooter;