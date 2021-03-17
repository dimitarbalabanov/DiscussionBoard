import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    color: '#878A8C'
  },
  button: {
    textTransform: 'none'
  },
  icon: {
    color: '#878A8C',
  }
}));

const GreyButton = props => {
  const classes = useStyles();
  
  const { 
    title,
    icon,
    onClick
  } = props;

  return (
    <Button className={classes.button} onClick={onClick} size="small" startIcon={icon}>
      <Typography className={classes.title} color="textSecondary" variant="body2">
        {title}
      </Typography>
    </Button>
  );
}

export default GreyButton;