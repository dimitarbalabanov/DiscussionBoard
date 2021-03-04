import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const authRoutes = [
  {
    title: 'Nickname',
    href: '/user',
    variant: 'outlined',
    icon: <PersonIcon />
  },
  {
    title: 'Logout',
    href: '/logout',
    variant: 'contained',
    icon: <PowerSettingsNewIcon />
  }
];

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

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1)
  },
  button: {
    width: '150px',
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  nav: {
  display: 'flex',
  flexDirection: 'row',
  }
}));

const TopBar = props => {
  const classes = useStyles();
  const { isAuth, username } = props;

  let routes = isAuth ? authRoutes : guestRoutes;
  
  return (
    <List className={classes.nav}>
      {routes.map(route =>
      <ListItem className={classes.item} disableGutters key={route.title}>
        <Button
          className={classes.button}
          disableElevation
          variant={route.variant}
          component={RouterLink}
          to={route.href}
          color="primary"
        >
          <div className={classes.icon}>{route.icon}</div>
          {route.title}
        </Button>
      </ListItem>)}
    </List>
  );
};

export default TopBar;