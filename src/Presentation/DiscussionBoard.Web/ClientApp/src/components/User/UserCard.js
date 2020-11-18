import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
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
  },
  avatar: {
    height: 150,
    width: 150,
    margin: 'auto'
  },
}));

const UserCard = props => {
  const classes = useStyles();

  const username = "CoolGuy"
  const src = "https://support.hubstaff.com/wp-content/uploads/2019/08/good-pic.png";
  const bio = "Just a random guy from somewhere random that got into a random stuff while randomly being random."
  const postsCount = 35;
  const commentsCount = 120;
  const karma = 205;

  return (
    <Card className={classes.card} variant="outlined">
      <div className={classes.cardDetails}>
        <CardContent>
        <Avatar
          className={classes.avatar}
          src={src}
          />
        <Typography className={classes.title} component="h1" variant="h1" align="center">
          {"u/" + username}
        </Typography>
          <Divider className={classes.margin}/>
          <Typography className={classes.title} color="textSecondary" display="inline" variant="body2"> 
            {bio}
          </Typography>
          <Divider className={classes.margin}/>
          <Grid  container justify="center" spacing={2} >
            <Grid className={classes.statsItem} item>
              <ChatBubbleIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
                {`${postsCount} Posts`}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <CommentIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
                {`${commentsCount} Comments`}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <AllInclusiveIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
                {`${karma} Karma`}
              </Typography>
            </Grid>
            <Button
              size="small"
              variant="contained"
              //color="primary"
              className={classes.button}
              startIcon={<NoteAddIcon />}
            >
              Edit
            </Button>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
}

export default UserCard;