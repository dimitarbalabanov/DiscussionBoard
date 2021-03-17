import React from 'react';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core';
import Header from './components/Header/Header';

const useStyles = 
  makeStyles((theme) => ({
    container: {
      padding: 0
    }
  }));

const Layout = props => {
  const { isAuth, username } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <Header 
        isAuth={isAuth} 
        username={username} 
      />
      <Container maxWidth={false} className={classes.container}>
        <main>
            {props.children}
        </main>
      </Container>
    </React.Fragment>
  );
}

export default Layout;