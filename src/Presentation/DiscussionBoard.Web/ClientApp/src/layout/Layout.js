import React from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/Header/Header';
import Navigation from './components/New/Navigation';
// import Footer from './components/Footer/Footer';

const Layout = props => {
  const { isAuth, username } = props

  return (
    <React.Fragment>
      <Navigation isAuth={isAuth} username={username} />
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