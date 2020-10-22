import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../../store/actions';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  }
}));

const LogoutButton = props => {
  const { onLogout } = props;
  const classes = useStyles();
  return (
    <Button className={classes.button} onClick={onLogout} size="small" variant="contained" color="primary"> 
      <div className={classes.icon}>
        <ExitToAppIcon />
      </div>
      {'Logout'}
    </Button>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LogoutButton);
