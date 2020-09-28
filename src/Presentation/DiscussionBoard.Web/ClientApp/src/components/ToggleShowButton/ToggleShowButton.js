import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: theme.spacing(3)
  }
}));

const ToggleShowButton = props => {
  const classes = useStyles();

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const { 
    title,
    component: Component,
     ...rest 
  } = props;
  
  return (
    <React.Fragment>
      <Fab color="primary" size="medium" aria-label="add" onClick={handleClick} className={classes.button} >
        <AddIcon />
      </Fab>
      {show ? <Component handleClose={handleClick} {...rest}/> : null}
    </React.Fragment>
  );
}

export default ToggleShowButton;