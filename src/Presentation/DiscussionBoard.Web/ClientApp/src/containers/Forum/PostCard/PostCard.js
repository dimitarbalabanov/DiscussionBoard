import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const PostCard = (props) => {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea >
      <Link to={`/posts/${post.id}`}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              {/* <Typography variant="subtitle1" color="textSecondary">
                {post.date}
              </Typography> */}
              <Typography variant="subtitle1" paragraph>
                {post.content}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
              <Grid container spacing={2}>
                {/* <Grid className={classes.statsItem} item >
                  <ChatBubbleIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2" >
              {forum.postsCount} {' '} Posts
            </Typography>
                  </Grid> */}
                  <Grid className={classes.statsItem} item >
                  <CommentIcon className={classes.statsIcon} color="action" />
                <Typography color="textSecondary" display="inline" variant="body2" >
                  {post.commentsCount} {' '} Comments
                </Typography>
              </Grid>
            </Grid>
            </CardContent>
          </div>
          {/* <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden> */}
        </Card>
        </Link>
      </CardActionArea>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;