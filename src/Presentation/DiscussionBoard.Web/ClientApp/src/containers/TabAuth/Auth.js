import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../store/actions';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Page from '../../components/Page/Page';
import Spinner from '../../components/Spinner/Spinner';
import TabPanel from './components/TabPanel/TabPanel';
import LoginFrom from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.dark,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Auth = props => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const { 
  //   forums,
  //   loading,
  //   onFetchForums
  //  } = props;

  // useEffect(() => {
  //   onFetchForums();
  // }, [onFetchForums]);

  // let forumsDiv = <Spinner />;

  // if (!loading) {
  //   forumsDiv = (
      
  //   );
  // }

  return (
    <Page title="Authentication">
     <Box display="flex" flexDirection="column" height="100%" justifyContent="center"className={classes.mainGrid}>
        <Container maxWidth="sm">
          <div className={classes.root}>
            <Paper square>
              <Tabs centered value={value} onChange={handleChange}>
                <Tab label="Sign in" index={0} />
                <Tab label="Sign up" index={1} />
              </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
              <LoginFrom />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <RegisterForm />
            </TabPanel>
          </div>
        </Container> 
      </Box>
    </Page>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);



// export default function AuthTab() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Page className={classes.root} title="Sign in/up">
//       <Box
//         display="flex"
//         flexDirection="column"
//         height="100%"
//         justifyContent="center"
//       >
//         <Container maxWidth="sm">
        
        
      
//         </Container>
//       </Box>
//     </Page>
//   );
// }

