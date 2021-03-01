import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CommentIcon from '@material-ui/icons/Comment';
import PostVoting from '../../Voting/PostVoting';
import PostFirstLine2 from '../PostFirstLine2';
import DeleteAndConfirmButton from '../../AUI/DeleteAndConfirmButton';
const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    // borderStyle: "solid",
    // borderWidth: "1.5px 1.5px 1.5px 1.5px",
    // borderColor: theme.palette.primary.main,
    // '&:hover': {
    //   borderColor: theme.palette.secondary.main,
    // }
  },
  cardDetails: {
    flex: 1
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(1)
  },
  title: {
    marginLeft: theme.spacing(1)
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
        {/* <PostFirstLine1 forumId={post.forumId} forumTitle={post.forumTitle} creatorUserName={post.creatorUserName} createdOn={post.createdOn}/> */}
        <PostFirstLine2 forumId={post.forumId} forumTitle={post.forumTitle} creatorUserName={post.creatorUserName} createdOn={post.createdOn}/>
        <Link to={`/posts/${post.id}`}>
          <Grid item>
            <Typography className={classes.title} color="textPrimary" component="h2" variant="h4">
            {post.title.length > 65 ? post.title.substring(0, 120) + '...' : post.title}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item >
              <Typography color="textSecondary" display="inline" variant="body2" >
              {`${post.content ? post.content.substring(0,250) + "..." : null} `}
              </Typography>
          </Grid>
        </Link>
          <Grid className={classes.statsItem} item >
            <CommentIcon className={classes.statsIcon} color="primary"/>
              <Typography color="textSecondary" display="inline" variant="body2" >
              {`${post.commentsCount} Comments`}
              </Typography>
          <DeleteAndConfirmButton />
          </Grid>
      </Grid>
    </Paper>
  );
}

export default React.memo(AnotherPostCard);