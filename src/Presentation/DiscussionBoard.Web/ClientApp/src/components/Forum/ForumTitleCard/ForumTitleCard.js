import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import avatar from '../../../assets/images/leaves.jpg'
import { CircularProgress } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  card: {
    // border: "1px solid",
    // borderStyle: 'solid',
    // borderWidth: '10px 0px 0px 0px',
    //borderColor: theme.palette.primary.main,
    paddingBottom: theme.spacing(1),
    display: "flex",
    alignItems: "flex-start",
    
    //justifyContent: 'center'
  },
  margin: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  grid: {
    margin: theme.spacing(2)
  },
  avatar: {
    height: 80,
    width: 80,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  title: {
    color: theme.palette.common.black,
    // fontSize: '70px'
  },
  white: {
    backgroundColor: theme.palette.common.white,
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
  }
}));

const ForumTitleCard = props => {
  const classes = useStyles();
  const { 
    forum,
    //loading
  } = props;

  return (
    <React.Fragment>
      <Box className={classes.primary} p={5} />
      <Box className={classes.white} display="flex" alignItems="center" justifyContent="center" mb={2}>
        {/* {forum ? */}
          <React.Fragment>
            {forum ? <Avatar
              className={classes.avatar}
              src={avatar}
            /> : <Skeleton variant="circle"  className={classes.avatar} />}
            <Typography className={classes.title} component="h1" variant="h3">
                { forum ? forum.title : <Skeleton variant="text" width={200}/>}
            </Typography>
          </React.Fragment>
        {/* : <CircularProgress className={classes.grid} size={64}/>} */}
      </Box> 
    </React.Fragment> 
  );
}

export default React.memo(ForumTitleCard);