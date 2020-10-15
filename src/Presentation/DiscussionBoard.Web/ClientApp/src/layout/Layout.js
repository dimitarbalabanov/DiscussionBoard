import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './components/Header/Header';
import DrawerBar from './components/DrawerBar/DrawerBar';
import Footer from './components/Footer/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { GridListTile } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  // root: {
  //   paddingTop: 56,
  //   height: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     paddingTop: 64
  //   }
  // },
  // mainGrid: {
  //   marginTop: theme.spacing(3),
  // },
  // background: {
  //   backgroundColor: theme.palette.primary.main,
  // },
}));

const Layout = props => {
  const { isAuth, username } = props
  //const classes = useStyles();

  const [openDrawerNav, setOpenDrawerNav] = useState(false);

  const handleDrawerNavOpen = () => {
    setOpenDrawerNav(true);
  };

  const handleDrawerNavClose = () => {
    setOpenDrawerNav(false);
  };

  return (
    <React.Fragment>
      <Header onSidebarOpen={handleDrawerNavOpen} isAuth={isAuth} username={username} />
      <DrawerBar onClose={handleDrawerNavClose} open={openDrawerNav} isAuth={isAuth} username={username}/>
      <Container maxWidth="lg">
        <main>
            {props.children}
        </main>
        {/* <Footer /> */}
      </Container>
    </React.Fragment>
  );
}

export default Layout;