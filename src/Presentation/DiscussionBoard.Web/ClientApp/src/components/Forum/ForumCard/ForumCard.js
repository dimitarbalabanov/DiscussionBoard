import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "18px"
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  }
}));

const ForumCard = props => {
  const classes = useStyles();

  const { 
    id,
    title,
    postsCount,
    commentsCount,
  } = props.forum;

  const {
    loading
  } = props;

  return (
    <Card className={classes.card} variant="outlined" borderColor="primary" component={Link} to={`/forums/${id}`}>
      <div className={classes.cardDetails}>
        <CardHeader className={classes.header}/>
        <CardContent>
          <Typography className={classes.title} component="h2" variant="h3" align="center">
            {loading ? <Skeleton /> : title}
          </Typography>
          <Grid container justify="center" spacing={2}>
            <Grid className={classes.statsItem} item>
              <ChatBubbleIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
                {loading ? <Skeleton /> :`${postsCount} Posts`}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <CommentIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
                {loading ? <Skeleton /> :`${commentsCount} Comments`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
}

ForumCard.propTypes = {
  forum: PropTypes.object,
};

export default ForumCard;