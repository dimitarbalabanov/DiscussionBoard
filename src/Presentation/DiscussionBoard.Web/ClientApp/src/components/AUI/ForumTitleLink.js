import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
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

const ForumTitleLink = props => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);

  const {
    forumId,
    forumTitle,
  } = props;

  return (
    <Box display="flex" alignItems="center" mt={0.5} ml={0.5}>
      <Avatar
      className={classes.avatar}
      //src={mediaUrl}
      >{forumTitle.substring(0, 2).toLowerCase()}</Avatar>
      <Typography color="textSecondary" variant="body2">
      <Link component={RouterLink} to={"/forums/" + forumId} className={classes.textColor}>
          {'f/' + forumTitle}
      </Link>
      </Typography>
    </Box>
  );
}

export default React.memo(ForumTitleLink);