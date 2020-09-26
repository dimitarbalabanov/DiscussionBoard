import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TabPanel from '../../containers/TabAuth/components/TabPanel/TabPanel';
import LoginFrom from '../../containers/TabAuth/components/LoginForm/LoginForm';
import RegisterForm from '../../containers/TabAuth/components/RegisterForm/RegisterForm';
import Page from '../Page/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AuthTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page className={classes.root} title="Sign in/up">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
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

