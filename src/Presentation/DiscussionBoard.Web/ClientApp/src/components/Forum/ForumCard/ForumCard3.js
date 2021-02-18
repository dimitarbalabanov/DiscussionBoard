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
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    borderStyle: "solid",
    borderWidth: "2px 2px 2px 10px",
    borderColor: theme.palette.primary.main,
    '&:hover': {
      borderColor: theme.palette.secondary.main,
    },
  },
  div: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
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
  header: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  avatar: {
    height: 40,
    width: 40,
    display: 'flex',
    marginRight: theme.spacing(1),
  },
  asdf: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '22px'
  }
}));

const ForumCard = props => {
  const classes = useStyles();

  const { 
    id,
    title,
    mediaUrl,
    postsCount,
    commentsCount,
  } = props.forum;

  const {
    loading
  } = props;

  return (
    <Card className={classes.card} component={Link} to={`/forums/${id}`}>
      <Grid container alignItems="center" className={classes.div}>
        <Grid item> 
          <Avatar
          className={classes.avatar}
          //src={forum.mediaUrl}
          >
          {title.substring(0, 2).toLowerCase()}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography className={classes.title} component="h3" variant="h4" align="center">
            <span className={classes.asdf}>{"f/"}</span>{title.substring(0,10).toLowerCase()}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

ForumCard.propTypes = {
  forum: PropTypes.object,
};

export default ForumCard;