import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import TabPanel from './TabPanel';
import LoginFrom from '../../containers/Auth/components/LoginForm/LoginForm';
import RegisterForm from '../../containers/Auth/components/RegisterForm/RegisterForm';
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
    <div className={classes.root}>
      <Paper square>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Sign in" {...a11yProps(0)} />
          <Tab label="Sign up" {...a11yProps(1)} />
        </Tabs>
        </Paper>
      <TabPanel value={value} index={0}>
        <LoginFrom />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegisterForm />
      </TabPanel>
    </div>
  );
}
