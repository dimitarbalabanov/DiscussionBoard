import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CommentIcon from '@material-ui/icons/Comment';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import ConvertToRelativeTime from '../../../../../utils/dateConvertor';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    marginTop: theme.spacing(1)
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "18px"
  }
}));

const HomePostCard = (props) => {
  const classes = useStyles();
  const { post, loading } = props;

  return (
    <Link to={`/posts/${post.id}`}>
      <Grid item xs={12} md={12} component={Paper} className={classes.root}>
        <Grid className={classes.statsItem} item >
          <Typography color="textSecondary" display="inline" variant="body2" >
            {loading ? <Skeleton /> : 
              <React.Fragment>
                <strong>{post.forumTitle}</strong> posted {ConvertToRelativeTime(post.createdOn)} by <strong>{post.creatorUserName}</strong>
              </React.Fragment>}
          </Typography>
        </Grid>
        <Grid className={classes.statsItem} item >
          <Typography component="h2" variant="h4">
          {loading ? <Skeleton /> : post.title.length > 65 ? post.title.substring(0, 65) + '...' : post.title}
          </Typography>
        </Grid>
        <Grid className={classes.statsItem} item >
          <CommentIcon className={classes.statsIcon} color="action"/>
            <Typography color="textSecondary" display="inline" variant="body2" >
            {loading ? <Skeleton /> :`${post.commentsCount} ' ' Comments`}
              {/* {post.commentsCount} {' '} comments */}
            </Typography>
        </Grid>
      </Grid>
    </Link>
  );
}

export default HomePostCard;