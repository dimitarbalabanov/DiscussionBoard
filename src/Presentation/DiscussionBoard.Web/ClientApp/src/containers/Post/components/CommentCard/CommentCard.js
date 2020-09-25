import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import ScoreIcon from '@material-ui/icons/Score';

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
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  pad: {
    padding: theme.spacing(3)
  }
}));

const CommentCard = props => {
  const classes = useStyles();
  const { 
    //id,
    content,
    creatorUserName,
    createdOn,
    votesScore
   } = props.comment;

  return (
    <Grid item xs={12} className={classes.pad}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Avatar />
            <Typography variant="subtitle1" color="textSecondary">
              {creatorUserName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {createdOn}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {content}
            </Typography>
            <Grid className={classes.statsItem} item >
              <ScoreIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
                {votesScore} {' '} Score
              </Typography>
            </Grid>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object,
};

export default CommentCard;