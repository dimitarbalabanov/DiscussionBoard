import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Spinner from '../../Spinner/Spinner';
import avatar from '../../../assets/images/leaves.jpg'

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.common.white
    // borderStyle: "solid",
    // borderWidth: "1px 1px 1px 1px",
    // borderColor: theme.palette.primary.main,
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
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    fontWeight: 'bold'
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  avatar: {
    height: 100,
    width: 100,
    margin: 'auto',
    marginTop: theme.spacing(2)
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    color: theme.palette.background.default,
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  button: {
    //textTransform: 'none',
    borderRadius: '50px',
    color: theme.palette.background.default,

    '&:hover': {
      backgroundColor: theme.palette.primary.secondary,
    },
  },
}));

const PostForumCard = props => {
  const classes = useStyles();

  const { 
    forum,
    loading
  } = props;
  
  return (
    <Grid item md={10}>
      <div className={classes.card}>
        <Typography className={classes.header} component="h3" variant="h5">
          {"Forum"}
        </Typography>
        {loading || !forum ? 
          <Spinner />
        :
          <React.Fragment>
            <Avatar
              className={classes.avatar}
              src={avatar}
            />
            <Typography className={classes.title} color="textSecondary" component="h3" variant="h2" align="center">
              {forum.title}
            </Typography>
            <Divider className={classes.margin}/>
            <Typography className={classes.title} color="textSecondary" variant="h5" align="center"> 
              {forum.subtitle}
            </Typography>
            <Divider className={classes.margin}/>
            <Typography className={classes.title} color="textSecondary" variant="body2" align="center"> 
              {forum.description}
            </Typography>
            <Divider className={classes.margin}/>
            <Grid  container justify="center" spacing={2} >
              <Grid className={classes.statsItem} item>
                <ChatBubbleIcon className={classes.statsIcon} color="primary" />
                <Typography color="textSecondary"  variant="body2" align="center">
                  {`${forum.postsCount} Posts`}
                </Typography>
              </Grid>
              <Grid className={classes.statsItem} item>
                <CommentIcon className={classes.statsIcon} color="primary" />
                <Typography color="textSecondary"  variant="body2" >
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
          </React.Fragment>}
      </div>
    </Grid>
  );
}

export default PostForumCard;