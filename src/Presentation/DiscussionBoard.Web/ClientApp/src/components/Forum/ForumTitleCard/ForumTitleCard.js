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
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  card: {
    // borderColor: theme.palette.primary.main,
    // border: '1px solid',
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
    borderStyle: "solid",
    borderWidth: "2px 2px 2px 10px",
    borderColor: theme.palette.primary.main,
  },
  divv: {
    // borderColor: theme.palette.primary.main,
    // border: '1px solid',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    
  },
  title: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  avatar: {
    height: 130,
    width: 130,
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
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
    <Grid item xs={12} md={10} className={classes.divv}>
      {loading || !forum ? null : 
      <React.Fragment>
        <Grid item xs={12} md={3}>
        <Card className={classes.card} >
          <Avatar
          className={classes.avatar}
          //src={forum.mediaUrl}
          >
            {forum.title.substring(0, 2).toLowerCase()}
          </Avatar>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}> 
        <Card className={classes.card} >
          <Typography className={classes.title} component="h1" variant="h1" align="center">
            {loading || !forum ? null : "f/" + forum.title.substring(0, 10).toLowerCase()}
          </Typography>
        </Card>
        </Grid>
      </React.Fragment>
      }
    </Grid>
  );
}

ForumTitleCard.propTypes = {
  forum: PropTypes.object,
};

export default ForumTitleCard;