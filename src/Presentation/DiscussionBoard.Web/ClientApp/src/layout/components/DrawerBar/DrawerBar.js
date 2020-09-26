import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import Navigation from '../Navigation/Navigation';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const DrawerBar = props => {
  const { open, onClose, className, isAuth, username } = props;

  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant='temporary'
    >
      <div className={clsx(classes.root, className)}>
        {/* <Profile username={props.username}/> */}
        <Typography variant="h6" align="center" gutterBottom>
          {username}
        </Typography>
        <Divider className={classes.divider} />
        <Navigation className={classes.nav} isAuth={isAuth} />
      </div>
    </Drawer>
  );
};

DrawerBar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default DrawerBar;
