import React from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
//import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  card: {
    // borderColor: theme.palette.primary.main,
    // border: '1px solid',
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'flex-end',
    padding: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  avatar: {
    height: 150,
    width: 150
  },
  header: {
    backgroundColor: null
  }
}));

const ForumTitleCard = props => {
  const classes = useStyles();

  const { 
    forum,
    loading
  } = props;

  return (
    <Grid item xs={12} md={10}>
          {loading || !forum || !forum.color ? null : <CardHeader style={{backgroundColor: "#" + forum.color}}/>}
      <Card className={classes.card} >
      {loading || !forum ? null : 
          <Avatar
          className={classes.avatar}
          //src={forum.mediaUrl}
          />}
        <Typography className={classes.title} component="h1" variant="h1" align="center">
          {loading || !forum ? <Skeleton /> : "f/" + forum.title.substring(0, 10).toLowerCase()}
        </Typography>
      </Card>
          {loading || !forum || !forum.color ? null : <CardHeader style={{backgroundColor: "#" + forum.color}}/>}
    </Grid>
  );
}

ForumTitleCard.propTypes = {
  forum: PropTypes.object,
};

export default ForumTitleCard;