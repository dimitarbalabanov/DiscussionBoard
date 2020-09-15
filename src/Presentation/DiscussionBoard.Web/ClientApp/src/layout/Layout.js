import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';
import Footer from "./components/Footer/Footer";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  content: {
    height: '100%'
  }
}));

const Layout = props => {
  const { children } = props;
  
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? false : openSidebar;

  return (
    <div className={clsx({[classes.root]: true})}>
      <Topbar onSidebarOpen={handleSidebarOpen}  isAuth={props.isAuth}
        username={props.username} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant='temporary'
        isAuth={props.isAuth}
        username={props.username}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
