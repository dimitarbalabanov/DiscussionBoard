import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
//import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    borderColor: theme.palette.primary.main,
    border: '1px solid'
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
  },
  button: {
    marginTop: theme.spacing(1)
  },
  text: {
    color: theme.palette.background.default
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

const AboutForumCard = props => {
  const classes = useStyles();

  const { 
    forum,
    loading
  } = props;

  return (
    <Card className={classes.card} variant="outlined">
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography className={classes.title} component="h2" variant="h4">
            {"About forum"}
            <Divider />
          </Typography>
          <Typography className={classes.title} color="textSecondary" display="inline" variant="body2"> 
            {loading || !forum ? <Skeleton /> : forum.description ? forum.description : "nema description"}
          </Typography>
          <Divider className={classes.margin}/>
          <Grid  container justify="center" spacing={2} >
            <Grid className={classes.statsItem} item>
              <ChatBubbleIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
                {loading || !forum ? <Skeleton /> :`${forum.postsCount} Posts`}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <CommentIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
                {loading || !forum ? <Skeleton /> :`${forum.commentsCount} Comments`}
              </Typography>
            </Grid>
            {loading || !forum ? null : <Button
              component={Link}
              to={'/create'}
              size="small"
              variant="contained"
              //color="primary"
              className={classes.button}
              startIcon={<NoteAddIcon />}
              style={{backgroundColor: "#" + forum.color}}
            >
              Post in {loading || !forum ? <Skeleton /> : forum.title}
            </Button>}
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
}

AboutForumCard.propTypes = {
  forum: PropTypes.object,
};

export default AboutForumCard;