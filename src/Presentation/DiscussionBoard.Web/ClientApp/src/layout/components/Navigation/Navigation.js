import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonIcon from '@material-ui/icons/Person';
import { Person } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
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
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const Navigation = props => {
  const { className, isAuth, username } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Home',
      href: '/',
      exact: true,
      icon: <DashboardIcon />,
      render: true
    },
    {
      title: 'Login',
      href: '/login',
      icon: <PeopleIcon />,
      render: !isAuth
    },
    {
      title: 'Register',
      href: '/register',
      icon: <LockOpenIcon />,
      render: !isAuth
    },
    {
      title: 'Logout',
      href: '/logout',
      icon: <TextFieldsIcon />,
      render: isAuth
    },
    {
      title: username,
      href: '/profile',
      icon: <PersonIcon />,
      render: isAuth
    }
  ];

  return (
    <List className={clsx(classes.root, className)}>  
      {pages.map(page => page.render
          ? <ListItem className={classes.item} disableGutters key={page.title}>
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                to={page.href}
                exact={page.exact}
              >
              <div className={classes.icon}>{page.icon}</div>
                {page.title}
              </Button>
            </ListItem>  
          : null)}
    </List>
  );
};

Navigation.propTypes = {
  className: PropTypes.string
};

export default Navigation;
