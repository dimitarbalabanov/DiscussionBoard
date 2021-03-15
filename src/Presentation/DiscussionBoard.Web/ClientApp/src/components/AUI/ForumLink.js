import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: theme.palette.common.black,
    fontWeight: 'bold'
  },
  avatar: {
    height: 23,
    width: 23,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.3),
    //color: theme.palette.getContrastText(deepOrange[500]),
    //backgroundColor: deepOrange[500],
  }
}));

const ForumLink = props => {
  const classes = useStyles();

  const {
    forumId,
    forumTitle,
    mediaUrl
  } = props;

  return (
    <Box display="flex" alignItems="flex-end" mt={1} mb={1} ml={0.5}>
      <Avatar
        className={classes.avatar}
        src={mediaUrl}
        >{forumTitle.substring(0, 2).toLowerCase()}</Avatar>
        <Typography color="textSecondary" variant="body2">
        <Link component={RouterLink} to={"/forums/" + forumId} className={classes.textColor}>
            {'f/' + forumTitle}
        </Link>
        </Typography>
    </Box>
  );
}
  
export default React.memo(ForumLink);