import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Logo from '../../../components/Logo/Logo';
import TopBar from '../TopBar/TopBar';
import MobileBar from '../MobileBar/MobileBar';

const logoutRoute = {
  title: 'Logout',
  href: '/logout',
  variant: 'contained',
  icon: <PowerSettingsNewIcon />
};

const guestRoutes = [
  {
    title: 'Login',
    href: '/login',
    variant: 'outlined',
    icon: <VpnKeyIcon />,
  },
  {
    title: 'Sign Up',
    href: '/register',
    variant: 'contained',
    icon: <PeopleIcon />,
  }
];

const useStyles = makeStyles((theme) => ({
  toolbar: {
    boxShadow: "none",
    backgroundColor: theme.palette.common.white,
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3)
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const { isAuth, username } = props;

  let routes;
  if (isAuth) {
    let profileRoute = {
      title: username,
      href: '/user',
      variant: 'outlined',
      icon: <PersonIcon />
    };
    routes = [profileRoute, logoutRoute];
  } else {
    routes = guestRoutes;
  }
  
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Hidden mdDown>
          <TopBar routes={routes} />
        </Hidden>
        <Hidden lgUp>
          <MobileBar routes={routes} />
        </Hidden>
      </Toolbar>
    </React.Fragment>
  );
}

export default Header
