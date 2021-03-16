import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import avatar from '../../../assets/images/consequatureaqueaut.png'
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    // border: "1px solid",
    borderStyle: 'solid',
    borderWidth: '10px 0px 0px 0px',
    borderColor: theme.palette.primary.main,
    paddingBottom: theme.spacing(1),
    display: "flex",
    alignItems: "flex-end",
    justifyContent: 'center'
  },
  margin: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  grid: {
    margin:'auto',
    marginBottom: theme.spacing(2),
  },
  avatar: {
    height: 120,
    width: 120,
  },
  title: {
    color: theme.palette.common.black,
    fontSize: '70px'
  }
}));

const ForumTitleCard = props => {
  const classes = useStyles();
  const { 
    forum,
    //loading
  } = props;

  return (
    <Grid item xs={12} md={12} className={classes.grid}>
       <Paper elevation={0} className={classes.card}>
         {forum ?
          <React.Fragment>
            <Avatar
              className={classes.avatar}
              src={avatar}
              />
            <Typography className={classes.title} color="primary" component="h1" variant="h1">
                {forum.title}
            </Typography>
          </React.Fragment> : <CircularProgress size={120}/>}
          
          {/* <Divider className={classes.margin}/>
          <Typography color="primary" component="h4" variant="h4"> 
            {"Optional didactic product"}
          </Typography> */}
        </Paper>
      </Grid>
  );
}

export default React.memo(ForumTitleCard);