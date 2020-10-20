import React from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
//import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    //backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    border: '3px solid'
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
    marginTop: theme.spacing(1),
    //color: theme.palette.background.default
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ForumTitleCard = props => {
  const classes = useStyles();

  const { 
    forum,
    loading
  } = props;

  return (
    <Grid item xs={12} md={10}>
      <Card className={classes.card} variant="outlined">
        <div className={classes.cardDetails}>
        {/* <CardHeader 
          className={classes.header}
          title={
            <Typography  className={classes.text} variant="h4" component="h2">
              {loading || !forum ? <Skeleton /> : forum.title}
            </Typography>
          } 
        /> */}
          <CardContent>
            <Typography className={classes.title} component="h1" variant="h1" align="center">
              {loading || !forum ? <Skeleton /> : forum.title}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

ForumTitleCard.propTypes = {
  forum: PropTypes.object,
};

export default ForumTitleCard;