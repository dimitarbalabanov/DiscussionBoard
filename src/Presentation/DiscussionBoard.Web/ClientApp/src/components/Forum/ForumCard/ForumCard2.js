import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';
import { SignalCellularNullTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
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
    marginBottom: theme.spacing(1)
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  }
}));

const ForumCard = props => {
  const classes = useStyles();

  const {
    loading,
    forums
  } = props;

  return (
    <Card className={classes.card} variant="outlined" >
      <div className={classes.cardDetails}>
        <CardHeader className={classes.header} title={"Forums"}/>
        <CardContent>
          {!loading && forums ? forums.map(forum => 
          <Typography key={forum.id} className={classes.title} component="h2" variant="h3" component={Link} to={`/forums/${forum.id}`}>
            {forum.title}
          </Typography>) : null}
        </CardContent>
      </div>
    </Card>
  );
}

ForumCard.propTypes = {
  forum: PropTypes.object,
};

export default ForumCard;