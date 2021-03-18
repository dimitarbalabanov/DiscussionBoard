import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Tooltip } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import {toRelativeTime, toComplexTime} from '../../utils/dateConvertor';

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#8F9394",
    // fontWeight: 'bold'
  },
  createdOn: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    },
  }
}));

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    marginBottom: theme.spacing(0.7)
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const CreatorAndCreatedOn = props => {
  const classes = useStyles();
  //const [show, setShow] = React.useState(false);

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
        <BootstrapTooltip title={toComplexTime(createdOn)} arrow placement="top">
            <span className={classes.createdOn}>{toRelativeTime(createdOn)}</span>
          </BootstrapTooltip> 
        </Typography>
        {/* <span 
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {show ? toComplexTime(createdOn) : toRelativeTime(createdOn)}
        </span> */}
    </Box>
  );
}

export default React.memo(CreatorAndCreatedOn);