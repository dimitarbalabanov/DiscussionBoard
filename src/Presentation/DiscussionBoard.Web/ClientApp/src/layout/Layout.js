import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/Header/Header';
//import Footer from './components/Footer/Footer';

//import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     paddingTop: 56,
//     height: '100%',
//     [theme.breakpoints.up('sm')]: {
//       paddingTop: 64
//     }
//   },
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
//   background: {
//     backgroundColor: theme.palette.primary.main,
//   },
// }));

const Layout = props => {
  const { isAuth, username } = props
  //const classes = useStyles();

  return (
    <React.Fragment>
      <Header isAuth={isAuth} username={username} />
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