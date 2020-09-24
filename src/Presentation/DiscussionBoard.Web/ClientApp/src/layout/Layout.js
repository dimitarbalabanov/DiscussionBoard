import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import SidebarNav from '../Layout/components/SidebarNav/SidebarNav';
import Topbar from '../Layout/components/Topbar/Topbar';
import Footer from '../Layout/components/Footer/Footer';
import SidebarMain from '../Layout/components/SidebarMain/SidebarMain';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

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

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};
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
      <CssBaseline />
      <Container maxWidth="lg">
        <Topbar onSidebarOpen={handleSidebarOpen}  isAuth={props.isAuth}
          username={props.username} />
        <SidebarNav
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          variant='temporary'
          isAuth={props.isAuth}
          username={props.username}
        />
        <main>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={8}>
              {children}
            </Grid>
              <SidebarMain
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
              />
          </Grid>
        </main>
      </Container>
      <Footer />
      {/* <Topbar onSidebarOpen={handleSidebarOpen}  isAuth={props.isAuth}
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
      </main> */}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
