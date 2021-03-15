import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Divider from '@material-ui/core/Divider';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';
import AnotherSpinner from '../../Spinner/AnotherSpinner';
import avatar from '../../../assets/images/consequatureaqueaut.png'

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
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    color: theme.palette.background.default,
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
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
    borderColor: theme.palette.primary.main,
    border: "1px solid"
  },
  avatar: {
    height: 30,
    width: 30,
    display: 'flex',
    //marginRight: theme.spacing(-1),
  },
  div : {
    borderBottom: "1px solid",
    borderColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

const TredingForumsCard = props => {
  const classes = useStyles();

  const { 
    forums,
    loading
  } = props;

  return (
    <Grid item md={10}>

    <Card className={classes.card} variant="outlined">
      <div className={classes.cardDetails}> 
          <Typography className={classes.header} component="h3" variant="h5">
              <span className={classes.asdf}>{"Forums"}</span>
          </Typography>
          <CardContent>
          {loading || !forums ? <AnotherSpinner /> : forums.map(forum => 
            <div  className={classes.div}>
              <Grid container  alignItems="center"  component={Link} to={`/forums/${forum.id}`}>
                <Grid item > 
                  <Avatar
                  className={classes.avatar}
                  //src={forum.mediaUrl}
                  >
                  {forum.title.substring(0, 2).toLowerCase()}
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography className={classes.title} component="h3" variant="h5">
                    <span className={classes.asdf}>{"f/"}</span>{forum.title}
                  </Typography>
                </Grid>
              </Grid> 
            </div>
          )}
        </CardContent>
      </div>
    </Card>
    </Grid>
  );
}

export default TredingForumsCard;