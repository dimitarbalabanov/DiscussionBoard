import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  CardActionArea,
  makeStyles
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';

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

const PostCard = ({ className, post, ...rest }) => {
  const classes = useStyles();

  return (
    <CardActionArea>
      <Link to={`/posts/${post.id}`}>
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {post.title}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt="forum"
            variant="square"
          />
          <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {post.creatorUserName}
        </Typography>
        </Box>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {post.commentsCount}
              {' '}
              Comments
            </Typography>
          </Grid>
          {/* <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {123}
              {' '}
              Posts
            </Typography>
          </Grid> */}
        </Grid>
      </Box>
    </Card>
    </Link>
    </CardActionArea>
  );
};

PostCard.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object.isRequired
};

export default PostCard;
