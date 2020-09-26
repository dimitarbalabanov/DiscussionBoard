import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3)
  }
}));

const ToggleShowButton = props => {
  const classes = useStyles();

  const [show, setShow] = useState(false);

  const { 
    title,
    component: Component,
     ...rest 
  } = props;
  
  return (
    <React.Fragment>
      <Button 
      variant="outlined" 
      color="primary" 
      onClick={() => setShow(!show)} 
      className={classes.button}
      >
        {title}
      </Button>
      {show ? <Component {...rest}/> : null}
    </React.Fragment>
  );
}

export default ToggleShowButton;