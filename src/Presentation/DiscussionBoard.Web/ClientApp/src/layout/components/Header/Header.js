import React from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { colors } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Navigation from '../Navigation/Navigation';

import { NavLink as RouterLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Logo from '../../../components/Logo/Logo';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from '../../../components/SearchToolbar/AnotherSearchToolbar';
import Search from '../../../components/SearchToolbar/SearchToolbar';
const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: "none",
    backgroundColor: colors.common.white,
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3)
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
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { isAuth, username, onSidebarOpen } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
      <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Search />
        <Hidden mdDown>
          <Navigation className={classes.nav} isAuth={isAuth} username={username}/>
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
