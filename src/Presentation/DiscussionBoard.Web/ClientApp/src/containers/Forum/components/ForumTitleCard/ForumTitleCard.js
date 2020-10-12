import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    borderColor: theme.palette.primary.main
  },
  cardDetails: {
    flex: 1,
  }
}));

const ForumTitleCard = props => {
  const classes = useStyles();

  // const { 
  //   id,
  //   title
  // } = props.forum;

  const id = 1;
  const title = "Programming";
  const loading = false;

  return (
    <Grid item xs={6} md={8}>
      <CardActionArea>
        <Link to={`/forums/${id}`}>
          <Card className={classes.card} variant="outlined" borderColor="primary">
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography className={classes.title} component="h2" variant="h3" align="center">
                  {loading ? <Skeleton /> : title}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Link>
      </CardActionArea>
    </Grid>
  );
}

ForumTitleCard.propTypes = {
  forum: PropTypes.object,
};

export default ForumTitleCard;