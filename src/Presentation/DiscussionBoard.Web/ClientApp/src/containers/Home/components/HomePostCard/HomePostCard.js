import React from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
//import TitleIcon from '@material-ui/icons/Title';
import CommentIcon from '@material-ui/icons/Comment';
import convertDate from '../../../../utils/dateConvertor';
//import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
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
    display: 'flex',
    marginTop: theme.spacing(1)
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "18px"
  }
}));

const HomePostCard = (props) => {
  const classes = useStyles();
  const { post } = props;
  const timeAgo = convertDate(new Date(post.createdOn));
  return (
    //<Grid item xs={8} md={6}>

    <Grid item xs={8} md={10}>
      <CardActionArea>
        <Link to={`/posts/${post.id}`}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Grid className={classes.statsItem} item >
                  <Typography color="textSecondary" display="inline" variant="body2" >
                    <strong>{post.forumTitle}</strong> posted {timeAgo} by <strong>{post.creatorUserName}</strong>
                  </Typography>
                </Grid>
                {/* <Typography component="h2" variant="h5">
                  {post.forumTitle}
                </Typography>
                <Typography  variant="caption" display="inline">
                  {timeAgo} by <Link>{post.creatorUserName}</Link>
                </Typography > */}
                <Grid className={classes.statsItem} item >
                 
                  <Typography component="h2" variant="h4">
                  {post.title}
                </Typography>
                </Grid>
                <Grid className={classes.statsItem} item >
                  <CommentIcon className={classes.statsIcon} color="action"/>
                    <Typography color="textSecondary" display="inline" variant="body2" >
                      {post.commentsCount} {' '} comments
                    </Typography>
                </Grid>
              </CardContent>
            </div>
          </Card>
        </Link>
      </CardActionArea>
    </Grid>
  );
}

export default HomePostCard;