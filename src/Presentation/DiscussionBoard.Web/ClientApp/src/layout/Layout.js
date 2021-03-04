import React from 'react';
import Container from '@material-ui/core/Container';
import Header from './components/Header/Header';

const Layout = props => {
  const { isAuth, username } = props

  return (
    <React.Fragment>
      <Header 
        isAuth={isAuth} 
        username={username} 
        />
      <Container maxWidth="lg">
        <main>
            {props.children}
        </main>
      </Container>
    </React.Fragment>
  );
}

export default Layout;