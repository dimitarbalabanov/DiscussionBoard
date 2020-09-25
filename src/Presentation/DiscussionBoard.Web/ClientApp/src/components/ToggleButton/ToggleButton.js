import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3)
  }
}));

const ToggleButton = props => {
  const classes = useStyles();

  const [toggle, setToggle] = useState(false);

  const { 
    title,
    component: Component,
     ...rest 
  } = props;
  
  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={() => setToggle(!toggle)} className={classes.button}>
        {title}
      </Button>
      {toggle ? <Component {...rest}/> : null}
    </React.Fragment>
  );
}

export default ToggleButton;