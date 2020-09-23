import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ForumCard = ({ className, forum, ...rest }) => {
  const classes = useStyles();

  return (
    <CardActionArea>
      <Link to={`/forums/${forum.id}`}>
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
          <CardContent>
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h2"
            >
              {forum.title}
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              variant="body1"
            >
              {forum.description}
            </Typography>
          </CardContent>
          <Box flexGrow={1} />
          <Divider />
          <Box p={2}>
          <Grid
          container
          spacing={2}
          >
          <Grid
            className={classes.statsItem}
            item
          >
            <ChatBubbleIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {forum.postsCount}
                  {' '}
                  Posts
            </Typography>
                  </Grid>
                  <Grid
                    className={classes.statsItem}
                    item
                  >
                  <CommentIcon
                    className={classes.statsIcon}
                    color="action"
                  />
                <Typography
                  color="textSecondary"
                  display="inline"
                  variant="body2"
                >
                  {forum.commentsCount}
                  {' '}
                  Comments
                  </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Link>
    </CardActionArea>
  );
};

ForumCard.propTypes = {
  className: PropTypes.string,
  forum: PropTypes.object.isRequired
};

export default ForumCard;
