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
    //paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  cardDetails: {
    flex: 1
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(1)
  },
  title: {
    marginLeft: theme.spacing(1)
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
  margin: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  avatar: {
    height: 120,
    width: 120,
    margin: 'auto',
  },
  asd: {
    marginLeft: theme.spacing(-5),
    marginRight: theme.spacing(-5),
  }
    
}));

const ForumTitleCard = props => {
  const classes = useStyles();
  useEffect(() => console.log("post card rendering"))
  const { 
    post,
    //loading
  } = props;

  return (
    <Grid item xs={12} md={10}>
       <Paper elevation={0} className={classes.card}>
          <Grid md={4} item className={classes.asd}>
            <Avatar
              className={classes.avatar}
              src={avatar}
              />
          </Grid>
          <Grid md={6} item>
            <Typography color="primary" component="h1" variant="h1" >
                {"Sharable"}
            </Typography>
            <Divider className={classes.margin}/>
            <Typography color="textSecondary" variant="body2" > 
              {"Optional didactic product"}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
  );
}

export default React.memo(ForumTitleCard);