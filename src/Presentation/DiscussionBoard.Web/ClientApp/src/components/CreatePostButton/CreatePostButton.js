import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import pic from '../../assets/images/pic.png'; 

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'none',
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(1),
    flexGrow: 1
  },
  img: {
    marginRight: theme.spacing(0.6),
  },
}));

const CreatePostButton = props => {
  const classes = useStyles();
  const { isAuthenticated } = props;

  return (
    <Grid item xs={12} md={10}>
      <Paper className={classes.card}>
        <div className={classes.statsItem}>
          <img 
            className={classes.img}
            src={pic}
            //height="auto"
            width="35px"
            alt="Discussion Board" 
            />
          {isAuthenticated ? 
            <TextField
              component={Link}
              to={'/posts/create'}
              placeholder={"Create post"}
              fullWidth
              color="primary"
              size="small"
              variant="outlined"
              margin="none"
            /> 
          : <TextField
              placeholder={"Please, login to create a post."}
              component={Link}
              to={'/login'}
              fullWidth
              color="primary"
              size="small"
              variant="outlined"
              margin="none"
            />}
        </div>
      </Paper>
    </Grid>
  );
}

export default React.memo(CreatePostButton);