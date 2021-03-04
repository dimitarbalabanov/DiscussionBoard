import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { colors } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Logo from '../../../components/Logo/Logo';
import TopBar from '../TopBar/TopBar';
import MobileBar from '../MobileBar/MobileBar';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    boxShadow: "none",
    backgroundColor: colors.common.white,
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    //borderBottom: `1px solid ${theme.palette.primary.main}`,
    // borderStyle: "solid",
    // borderWidth: "2px 2px 2px 2px",
    // borderRadius: '5px',
    // borderColor: theme.palette.primary.main,
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const { 
    isAuth,
    username
    } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Hidden mdDown>
          <TopBar isAuth={isAuth} username={username}/>
        </Hidden>
        <Hidden lgUp>
          <MobileBar isAuth={isAuth} username={username}/>
        </Hidden>
      </Toolbar>
    </React.Fragment>
  );
}

export default Header
