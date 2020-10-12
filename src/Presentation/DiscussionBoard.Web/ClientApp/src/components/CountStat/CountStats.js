import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CountStat = props => {
  const classes = useStyles();

  const {
    postsCount,
    commentsCount,
  } = props;

  return (
    <Grid container justify="center" spacing={2}>
      <Grid className={classes.statsItem} item>
        <ChatBubbleIcon className={classes.statsIcon} color="action" />
        <Typography color="textSecondary" display="inline" variant="body2" >
          {`${postsCount} Posts`}
        </Typography>
      </Grid>
      <Grid className={classes.statsItem} item>
        <CommentIcon className={classes.statsIcon} color="action" />
        <Typography color="textSecondary" display="inline" variant="body2" >
          {`${commentsCount} Comments`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CountStat;