import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Skeleton from '@material-ui/lab/Skeleton';
import CommentIcon from '@material-ui/icons/Comment';
import ConvertToRelativeTime from '../../../utils/dateConvertor';
import Empty from '../../Voting/Empty';
const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    }
  },
  cardDetails: {
    flex: 1
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(1)
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "18px"
  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    margin: theme.spacing(2)
  },
  textColor: {
    color: theme.palette.primary.main
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    maxWidth: 345,
  },
}));

const PostCard = props => {
  const classes = useStyles();
  const { 
    post,
    //loading
  } = props;
  
  return (
    <Card className={classes.card} variant="outlined" component={Link} to={`/posts/${post.id}`}>
      <Empty />
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardcontent}>
          {/* {loading ? <Skeleton /> :  */}
        <Grid className={classes.statsItem} item >
          <Typography color="textSecondary" display="inline" variant="body2" >
            <strong className={classes.textColor}>f/{post.forumTitle.substring(0, 10).toLowerCase()}</strong> posted by {post.creatorUserName} {ConvertToRelativeTime(post.createdOn)} 
          </Typography>
        </Grid>
        
        <Grid className={classes.statsItem} item >
          <Typography component="h2" variant="h4">
          {/* {loading ? <Skeleton /> :  */}
          {post.title.length > 65 ? post.title.substring(0, 120) + '...' : post.title}
          </Typography>
        </Grid>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <Grid className={classes.statsItem} item >
            <Typography color="textSecondary" display="inline" variant="body2" >
            {`${post.content.substring(0,250) + "..."} `}
            </Typography>
        </Grid>
        <Grid className={classes.statsItem} item >
          <CommentIcon className={classes.statsIcon} color="primary"/>
            <Typography color="textSecondary" display="inline" variant="body2" >
            {/* {loading ? <Skeleton /> : */}
            {`25 Comments`}
            </Typography>
        </Grid>
        </CardContent>
      </div>
    </Card>
  );
}

export default PostCard;