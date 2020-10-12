import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    //backgroundColor: theme.palette.grey[800],
    backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center',
  },
  // overlay: {
  //   position: 'absolute',
  //   top: 0,
  //   bottom: 0,
  //   right: 0,
  //   left: 0,
  //   backgroundColor: 'rgba(0,0,0,.3)',
  // },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const ForumHeading = props => {
  const classes = useStyles();
  const { 
    title
   } = props.forum;

  return (
    <Paper className={classes.mainFeaturedPost}>
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Anything about whatever.
            </Typography>
                            {/* <Typography variant="subtitle1" paragraph>
                  {description}
                </Typography> */}


            {/* <Link variant="subtitle1" href="#">
              {post.linkText}
            </Link> */}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

ForumHeading.propTypes = {
  forum: PropTypes.object,
};

export default ForumHeading;