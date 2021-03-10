import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import avatar from '../../../assets/images/consequatureaqueaut.png'

const useStyles = makeStyles((theme) => ({
  card: {
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    paddingBottom: theme.spacing(2),
    display: "flex",
    alignItems: "flex-end",
    //justifyContent: "center"
  },
  margin: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  avatar: {
    height: 120,
    width: 120,
    margin: 'auto'
  }
}));

const ForumTitleCard = props => {
  const classes = useStyles();
  const { 
    post,
    //loading
  } = props;

  return (
    <Grid item xs={12} md={10}>
       <Paper elevation={0} className={classes.card}>
          <Grid md={4} item>
            <Avatar
              className={classes.avatar}
              src={avatar}
              />
          </Grid>
          <Grid md={6} item >
            <Typography color="primary" component="h1" variant="h1">
                {"Sharable"}
            </Typography>
            <Divider className={classes.margin}/>
            <Typography color="primary" component="h4" variant="h4"> 
              {"Optional didactic product"}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
  );
}

export default React.memo(ForumTitleCard);