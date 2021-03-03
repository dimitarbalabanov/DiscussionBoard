import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { Link as RouterLink} from 'react-router-dom';
import PeopleIcon from '@material-ui/icons/People';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonIcon from '@material-ui/icons/Person';

const authRoutes = [
  {
    title: 'Nickname',
    href: '/user',
    icon: <PersonIcon />
  },
  {
    title: 'Logout',
    href: '/logout',
    icon: <TextFieldsIcon />
  }
];

const guestRoutes = [
  {
    title: 'Login',
    href: '/login',
    variant: 'outlined',
    icon: <PeopleIcon />,

  },
  {
    title: 'Sign Up',
    href: '/register',
    variant: 'contained',
    icon: <LockOpenIcon />,
  }
];

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1)
  },
  but: {
    width: '150px',
    //color: theme.palette.primary.main,
  },
  button: {
    color: theme.palette.primary.main,
    //color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
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
          //activeClassName={classes.active}
          //className={classes.button}
          className={classes.but}
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