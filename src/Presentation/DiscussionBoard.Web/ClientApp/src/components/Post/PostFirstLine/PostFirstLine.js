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
    color: '#1C1C1C',
    fontWeight: 'bold'
  },
  avatar: {
    height: 23,
    width: 23,
    marginRight: theme.spacing(0.3),
  }
}));

const PostFirstLine = props => {
  const classes = useStyles();

  const {
    creatorUserName,
    createdOn,
    forum
    //loading
  } = props;

  return (
    <Box display="flex" alignItems="flex-end">
      {forum && 
        <React.Fragment>
          <Avatar
            className={classes.avatar}
            //src={forum.mediaUrl} 
          />
        {/* >{forumTitle.substring(0, 2).toLowerCase()}</Avatar> */}
          <Typography className={classes.textColor} variant="body2">
            <Link component={RouterLink} to={"/forums/" + forum.id} className={classes.textColor}>
                {'f/' + forum.title}
            </Link>
          </Typography>
        </React.Fragment>}
        <CreatorAndCreatedOn creatorUserName={creatorUserName} createdOn={createdOn} />
    </Box>
  );
}
  
export default React.memo(PostFirstLine);