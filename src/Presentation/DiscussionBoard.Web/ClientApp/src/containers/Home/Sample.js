import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
}));

export default function NestedGrid(props) {
  const classes = useStyles();
  const { forum } = props;
  return (
    <div className={classes.root}>
    <Link to={`/forums/${forum.id}`}>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid container item xs={8} spacing={3}>
            <Grid item xs={3}>
              <Typography component="h2" variant="h5">
                {forum.title}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" paragraph>
                {forum.description}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <ChatBubbleIcon  color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
                {forum.postsCount} {' '} Posts
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <CommentIcon  color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
                {forum.commentsCount} {' '} Comments
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      </Link>
    </div>
  );
}
