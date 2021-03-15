import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: '600'
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
    <Button onClick={onClick} size="small" startIcon={icon}>
      <Typography className={classes.bold} color="textSecondary" variant="body2">
        {title}
      </Typography>
    </Button>
  );
}

export default GreyButton;