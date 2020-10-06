import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
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
    display: 'flex',
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(1)
  }
}));

const ForumCard = (props) => {
  const classes = useStyles();
  const { forum } = props;

  return (
    // <Grid item xs={6} md={4}>
    <Grid item xs={6} md={8}>
      <CardActionArea>
        <Link to={`/forums/${forum.id}`}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography className={classes.title} component="h2" variant="h2">
                  {forum.title}
                </Typography>
                {/* <Typography variant="subtitle1" paragraph>
                  {forum.description}
                </Typography> */}
                <Grid className={classes.statsItem} item >
                  <ChatBubbleIcon className={classes.statsIcon} color="action" />
                    <Typography color="textSecondary" display="inline" variant="body2" >
                      {forum.postsCount} {' '} Posts
                    </Typography>
                </Grid>
                <Grid className={classes.statsItem} item >
                  <CommentIcon className={classes.statsIcon} color="action" />
                    <Typography color="textSecondary" display="inline" variant="body2" >
                      {forum.commentsCount} {' '} Comments
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

ForumCard.propTypes = {
  forum: PropTypes.object,
};

export default ForumCard;