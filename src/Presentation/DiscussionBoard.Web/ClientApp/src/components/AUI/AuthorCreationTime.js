import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import {toRelativeTime, toComplexTime} from '../../utils/dateConvertor';
const useStyles = makeStyles((theme) => ({
  textColor: {
    textColor: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  }
}));

const AuthorAndCreationTime = props => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);

  const {
    forumId,
    forumTitle,
    creatorUserName,
    createdOn,
    mediaUrl
    //loading
  } = props;

  return (
    <Box display="flex" alignItems="center" mt={0.5} ml={0.5}>
      <Typography color="textSecondary" variant="body2">
      {" Posted "}
      {" by "} 
      <Link component={RouterLink} to={"/users/" + creatorUserName}>
          {'u/' + creatorUserName + ' '}
      </Link>
      <span onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}>
          {show ? toComplexTime(createdOn) : toRelativeTime(createdOn)}
      </span>
      </Typography>
    </Box>
  );
}

export default React.memo(AuthorAndCreationTime);