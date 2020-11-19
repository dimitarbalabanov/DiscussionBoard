import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import CreatedOnTooltip from '../CreatedOnTooltip/CreatedOnTooltip';

const useStyles = makeStyles((theme) => ({
  main: {
    margin: theme.spacing(0)
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(0.5)
  },
  linksItem: {
    marginTop: theme.spacing(1)
  },
  textColor: {
    textColor: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  avatar: {
    height: 30,
    width: 30,
    display: 'flex',
  },
}));

const PostFirstLine = props => {
  const classes = useStyles();

  const {
    forumId,
    forumTitle,
    creatorUserName,
    createdOn
    //loading
  } = props;

  return (
    <Grid className={classes.main} container alignItems="center" alignContent="center">
      <Grid className={classes.item} item >
          <Avatar
          className={classes.avatar}
          //src={forum.mediaUrl}
          />
      </Grid>
      <Grid className={classes.linksItem} item>
          <Typography color="textSecondary" display="inline" variant="body2" >
          <Link component={RouterLink} to={"/forums/" + forumId} className={classes.textColor}>
              {'f/' + forumTitle}
          </Link>
          {" posted "}
          {" by "} 
          <Link component={RouterLink} to={"/users/" + creatorUserName}>
              {'u/' + creatorUserName + ' '}
          </Link>
          <CreatedOnTooltip createdOn={createdOn}/>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default React.memo(PostFirstLine);