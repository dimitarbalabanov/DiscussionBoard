import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
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

const PostCard = props => {
  const classes = useStyles();
  const { 
    id,
    title,
    creatorUserName,
    createdOn,
    commentsCount
   } = props.post;

  return (
    <Grid item xs={12}>
      <CardActionArea>
        <Link to={`/posts/${id}`}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {title}
                </Typography>
                <Avatar />
                <Typography variant="subtitle1" color="textSecondary">
                  {creatorUserName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {createdOn}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Short content...
                </Typography>
                <Grid className={classes.statsItem} item >
                  <CommentIcon className={classes.statsIcon} color="action" />
                  <Typography color="textSecondary" display="inline" variant="body2" >
                    {commentsCount} {' '} Comments
                  </Typography>
                </Grid>
              </CardContent>
            </div>
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