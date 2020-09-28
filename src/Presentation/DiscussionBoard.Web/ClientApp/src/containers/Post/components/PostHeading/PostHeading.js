import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
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

const PostHeading = (props) => {
  const classes = useStyles();
  
  const {
    //id,
    title,
    content,
    creatorUserName,
    createdOn,
    comments
  } = props.post;

  return (
    <Card className={classes.card}>
      <div className={classes.cardDetails}>
        <CardContent>
          <Avatar />
          <Typography component="h2" variant="h5">
            {title}
          </Typography >
          <Typography  variant="caption" paragraph>
            {createdOn} by <Link>{creatorUserName}</Link>
          </Typography >
          <Typography paragraph>
            {content}
          </Typography>
          <Grid className={classes.statsItem} item >
            <CommentIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2" >
              {comments.length} {' '} Comments
            </Typography>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
}

export default PostHeading;