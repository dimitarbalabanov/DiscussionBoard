import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import {toRelativeTime, toComplexTime} from '../../utils/dateConvertor';

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#8F9394",
    // fontWeight: 'bold'
  }
}));

const CreatorAndCreatedOn = props => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);

  const {
    creatorUserName,
    createdOn,
  } = props;

  return (
    <Box display="flex" alignItems="center" mt={0.5} ml={0.5}>
      <Typography className={classes.title} variant="body2">
        {" Posted "}
        {" by "} 
        {/* <Link component={RouterLink} className={classes.title}>
            {'u/' + creatorUserName + ' '}
        </Link> */}
        <span className={classes.title}>
            {'u/' + creatorUserName + ' '}
        </span>
        
        <span 
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {show ? toComplexTime(createdOn) : toRelativeTime(createdOn)}
        </span>
      </Typography>
    </Box>
  );
}

export default React.memo(CreatorAndCreatedOn);