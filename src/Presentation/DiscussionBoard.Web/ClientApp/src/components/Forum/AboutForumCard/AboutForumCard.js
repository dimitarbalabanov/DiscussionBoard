import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Spinner from '../../Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    // borderColor: theme.palette.primary.main,
    // border: '1px solid'
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
    //marginTop: theme.spacing(1)
  },
  text: {
    color: theme.palette.background.default
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  avatar: {
    height: 150,
    width: 150,
    margin: 'auto'
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    color: theme.palette.background.default,
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
}));

const AboutForumCard = props => {
  const classes = useStyles();

  const { 
    forum,
    loading
  } = props;
  
  return (
    <Card className={classes.card}>
      <div className={classes.cardDetails}>
      <Typography className={classes.header} component="h3" variant="h5">
              {"About forum"}
          </Typography>
      {loading || !forum ? <Spinner /> : 
        <CardContent>
        <Typography className={classes.title} color="textSecondary" variant="h5" align="center"> 
            {forum.subtitle}
          </Typography>
          <Typography className={classes.title} color="textSecondary" variant="body2"> 
            {forum.description}
          </Typography>
          <Divider className={classes.margin}/>
          <Grid  container justify="center" spacing={2} >
            <Grid className={classes.statsItem} item>
              <ChatBubbleIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" align="center">
                {`${forum.postsCount} Posts`}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <CommentIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
                {`120 Comments`}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<NoteAddIcon />}
              >
                Post in {forum.title}
              </Button>
            </Grid>
          </Grid>
        </CardContent>}
      </div>
    </Card>
  );
}

export default AboutForumCard;