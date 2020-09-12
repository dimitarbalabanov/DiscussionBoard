import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
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

const ForumCard = ({ className, forum, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        {/* <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt="forum"
            src={forum.media}
            variant="square"
          />
        </Box> */}
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
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
        <Link to={`/forums/${forum.id}`}>VISIT</Link>
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
              Updated 2hr ago
            </Typography>
            
          </Grid>
          <Grid
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
              {forum.postsCount}
              {' '}
              Posts
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ForumCard.propTypes = {
  className: PropTypes.string,
  forum: PropTypes.object.isRequired
};

export default ForumCard;
