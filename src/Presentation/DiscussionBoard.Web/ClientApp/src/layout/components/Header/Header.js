import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { colors } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Navigation from '../Navigation/Navigation';

import { NavLink as RouterLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Logo from '../../../components/Logo/Logo';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: "none",
    backgroundColor: colors.common.white,
    justifyContent: 'space-between',
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const { isAuth, onSidebarOpen } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
      <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Hidden mdDown>
          <Navigation className={classes.nav} isAuth={isAuth}/>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen} >
            <MenuIcon />
          </IconButton>
        </Hidden>
        {/* <Button variant="outlined" size="small">
          Sign up
        </Button> */}
      </Toolbar>
      {/* <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar> */}
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};