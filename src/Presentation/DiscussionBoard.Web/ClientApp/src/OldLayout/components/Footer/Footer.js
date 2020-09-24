import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link, Container, CssBaseline } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  color: {
    backgroundColor: theme.palette.primary
  }
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (<React.Fragment>
    <CssBaseline />
      <Container maxWidth="lg" className={clsx(classes.root, className)}>
        <Typography variant="body1" align="center">
          &copy;{' '}
          <Link component={RouterLink}
            to={"/"}
          >
            Discussion Board
          </Link>
          . 2020
        </Typography>
        <Typography variant="caption" align="center" component="p">
          Created with love for the people who love to engage in discussions.
        </Typography>
      </Container>
      </React.Fragment>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
