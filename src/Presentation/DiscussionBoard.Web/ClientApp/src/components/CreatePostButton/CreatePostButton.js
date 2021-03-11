import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import NoteAddIcon from '@material-ui/icons/NoteAdd';

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
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "24px"
  },
}));

const CreatePostButton = props => {
  const classes = useStyles();
  const { isAuthenticated } = props;

  return (
    <Grid item xs={12} md={10}>
      <Paper className={classes.card}>
        <div className={classes.statsItem}>
          <NoteAddIcon color="primary"/>
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
              fullWidth
              color="primary"
              size="small"
              variant="outlined"
              margin="none"
              disabled
            />}
        </div>
      </Paper>
    </Grid>
  );
}

export default React.memo(CreatePostButton);