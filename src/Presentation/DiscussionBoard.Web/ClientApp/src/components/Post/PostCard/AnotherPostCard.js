import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CreatedOnTooltip from '../../CreatedOnTooltip/CreatedOnTooltip';
//import Skeleton from '@material-ui/lab/Skeleton';
import CommentIcon from '@material-ui/icons/Comment';
import ConvertToRelativeTime from '../../../utils/dateConvertor';
import PostVoting from '../../Voting/PostVoting';
import PostFirstLine from '../PostFirstLine';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    '&:hover': {
      border: '1px solid',
      borderColor: theme.palette.primary.main,
    }
  },
  cardDetails: {
    flex: 1
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(1)
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "18px"
  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    margin: theme.spacing(2),
    marginLeft: theme.spacing(1)
  },
  textColor: {
    color: theme.palette.primary.main
  },
  media: {
    height: 140,
    paddingTop: '70.25%',
  },
}));

const AnotherPostCard = props => {
  const classes = useStyles();
  useEffect(() => console.log("post card rendering"))
  const { 
    post,
    //loading
  } = props;

  return (
    <Paper className={classes.card}>
      <PostVoting />
      <Grid item>
        <PostFirstLine forumId={post.forumId} forumTitle={post.forumTitle} creatorUserName={post.creatorUserName} createdOn={post.createdOn}/>
        <Link to={`/posts/${post.id}`}>
          <Grid className={classes.statsItem} item >
            <Typography color="textPrimary" component="h2" variant="h4">
            {post.title.length > 65 ? post.title.substring(0, 120) + '...' : post.title}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item >
              <Typography color="textSecondary" display="inline" variant="body2" >
              {`${post.content ? post.content.substring(0,250) + "..." : null} `}
              </Typography>
          </Grid>
          <Grid className={classes.statsItem} item >
            <CommentIcon className={classes.statsIcon} color="primary"/>
              <Typography color="textSecondary" display="inline" variant="body2" >
              {`${post.commentsCount} Comments`}
              </Typography>
          </Grid>
        </Link>
      </Grid>
    </Paper>
  );
}

export default React.memo(AnotherPostCard);