import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CardMedia from '@material-ui/core/CardMedia';
import pic from '../../../assets/images/file-20170712-14488-19lw3sc.jpg'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CommentIcon from '@material-ui/icons/Comment';
import Voting from '../../Voting/Voting';
import PostFirstLine from '../PostFirstLine/PostFirstLine';
import DeleteButton from '../../AUI/DeleteButton';
import SavePostButton from '../../AUI/SavePostButton';
import GreyButton from '../../AUI/GreyButton';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    border: "1px solid",
    borderColor: "transparent",
    '&:hover': {
      borderColor: theme.palette.common.black,
    }
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(1),
  },
  title: {
    marginLeft: theme.spacing(1),
    color: '#222222',
  },
  asdf: {
    fontWeight: 'bold',
    color: '#878A8C'
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    color: '#878A8C',
    fontSize: "18px"
  },
  media: {
    height: 140,
    paddingTop: '70.25%',
    // height: 550,
    // width: '100%',
    // objectFit: 'cover'
  },
  imgGrid: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(1)
  }
}));

const PostCard = props => {
  const classes = useStyles();
  
  const { 
    post,
    //loading
  } = props;

  return (
    <Paper elevation={0} className={classes.card}>
      <Voting />
      <Grid item>
        <PostFirstLine 
          forum={ { id : post.forumId, title : post.forumTitle } }
          creatorUserName={post.creatorUserName} 
          createdOn={post.createdOn}/>
        <Link to={`/posts/${post.id}`}>
          <Grid item>
            <Typography className={classes.title} variant="h4">
            { post.title }
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item >
            <Typography color="textSecondary">
            {`${post.content ? post.content.length > 250 ? post.content.substring(0,250) + "..." : post.content : ""}`}
            </Typography>
          </Grid>
          {/*{post.mediaUrl && */}
          {/* <Grid className={classes.imgGrid} item >
            <CardMedia
              className={classes.media}
              title={post.title.substring(0, 10)}
              //image={post.mediaUrl}
              //image={pic}
              image={"https://bellette.com.au/uploads/images/_1250xAUTO_crop_center-center/Viral-Facebook-Memes.jpg"}
            />
          </Grid> */}
        </Link>
          <Grid className={classes.statsItem} item >
            <CommentIcon className={classes.statsIcon}/>
            <Typography  className={classes.asdf}  display="inline" variant="body2" >
              {`${post.commentsCount} Comments`}
            </Typography>
            <Button 
              component={Link}
              to={`/posts/${post.id}`} size="small" startIcon={<EditIcon className={classes.asdf}/>}>
              <Typography  className={classes.asdf}  display="inline" variant="body2">
                Edit
              </Typography>
            </Button>
            <DeleteButton />
            <SavePostButton />
          </Grid>
      </Grid>
    </Paper>
  );
}

export default React.memo(PostCard);