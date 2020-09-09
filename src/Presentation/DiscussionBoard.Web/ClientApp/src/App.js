import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
//import 'react-perfect-scrollbar/dist/css/styles.css';
import theme from './theme';
import Routes from './Routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
