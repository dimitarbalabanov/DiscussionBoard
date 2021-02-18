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
    boxShadow: 'none',
    borderStyle: "solid",
    borderWidth: "1.5px",
    borderRadius: '5px',
    borderColor: theme.palette.primary.main,
    '&:hover': {
      borderColor: theme.palette.secondary.main,
    },
    alignItems: 'center',
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
  React.useEffect(() => console.log("create post button rendering"))
  const { isAuthenticated } = props;

  const field = isAuthenticated ? 
    <TextField
      component={Link}
      to={'/create'}
      className={classes.textField}
      placeholder={"Create post"}
      fullWidth
      color="primary"
      size="small"
      variant="outlined"
      margin="none"
    /> 
  : <TextField
      className={classes.textField}
      placeholder={"Please, login to create a post."}
      fullWidth
      color="primary"
      size="small"
      variant="outlined"
      margin="none"
      disabled
    />;

  return (
    <Grid item xs={12} md={10}>
      <Paper className={classes.card}>
        <div className={classes.statsItem}>
          <NoteAddIcon  color="primary"/>
          {field}
        </div>
      </Paper>
    </Grid>
  );
}

export default React.memo(CreatePostButton);