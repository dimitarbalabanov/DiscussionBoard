import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Topbar from './components/Topbar/Topbar';
import Header from './components/Header/Header';
import DrawerBar from './components/DrawerBar/DrawerBar';
import Footer from './components/Footer/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const Layout = props => {
  const { children } = props
  const classes = useStyles();

  const [openDrawerNav, setOpenDrawerNav] = useState(false);

  const handleDrawerNavOpen = () => {
    setOpenDrawerNav(true);
  };

  const handleDrawerNavClose = () => {
    setOpenDrawerNav(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header onSidebarOpen={handleDrawerNavOpen} isAuth={props.isAuth} username={props.username} />
        <DrawerBar onClose={handleDrawerNavClose} open={openDrawerNav} variant='temporary' isAuth={props.isAuth} username={props.username}/>
        <main>  
          {children}
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}

export default Layout;