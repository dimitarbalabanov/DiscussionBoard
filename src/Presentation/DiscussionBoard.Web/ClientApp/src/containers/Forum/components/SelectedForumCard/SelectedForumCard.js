import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    color: theme.palette.primary,
    borderColor: theme.palette.primary.main
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
    marginRight: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  margin : {
    marginTop: theme.spacing(1)
  }
}));

const SelectedForumCard = props => {
  const classes = useStyles();

  // const { 
  //   id,
  //   title,
  //   postsCount,
  //   commentsCount,
  // } = props.forum;

const id = 1;
const title = "Gaming bitches";
const description = "For all the gaming enthusiast. Go ahead and be toxic as per usual.";
const postsCount = 10;
const commentsCount = 10;

  return (
    <Grid item xs={6} md={10}>
      <CardActionArea>
        <Link to={`/forums/${id}`}>
          <CardHeader 
            className={classes.header}
            color="primary"
          />
          <Card className={classes.card} variant="outlined" borderColor="primary">
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography className={classes.title} component="h2" variant="h2" align="center">
                  {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {description}
                 </Typography> 
                <Grid container className={classes.margin} justify="center" spacing={2}>
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
                </Grid>
              </CardContent>
            </div>
          </Card>
        </Link>
      </CardActionArea>
    </Grid>
  );
}

SelectedForumCard.propTypes = {
  forum: PropTypes.object,
};

export default SelectedForumCard;