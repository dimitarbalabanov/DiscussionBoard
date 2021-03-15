import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CreatorAndCreatedOn from '../../AUI/CreatorAndCreatedOn';

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

const PostFirstLine = props => {
  const classes = useStyles();

  const {
    forumId,
    forumTitle,
    creatorUserName,
    createdOn,
    mediaUrl,
    forum
    //loading
  } = props;

  return (
    <Box display="flex" alignItems="flex-end" mt={1} mb={1} ml={0.5}>
      {forum && <React.Fragment><Avatar
        className={classes.avatar}
        //src={forum.mediaUrl} 
        />
        {/* >{forumTitle.substring(0, 2).toLowerCase()}</Avatar> */}
        <Typography color="textSecondary" variant="body2">
        <Link component={RouterLink} to={"/forums/" + forum.id} className={classes.textColor}>
            {'f/' + forum.title}
        </Link>
        </Typography></React.Fragment>}
      
      <CreatorAndCreatedOn creatorUserName={creatorUserName} createdOn={createdOn} />
    </Box>
  );
}
  
export default React.memo(PostFirstLine);