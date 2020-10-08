import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    // marginLeft: theme.spacing(0),
    // marginRight: theme.spacing(1),
    //width: '90%',
  },
  margin: {
    // margin: theme.spacing(1),
  },
  card: {
    //display: 'flex',
  },
  cardDetails: {
    //flex: 1,
  },
  cardMedia: {
    //width: 160,
  },
  statsItem: {
    // alignItems: 'center',
    // display: 'flex',
    // marginTop: theme.spacing(1)
  }
}));


const Create = props => {
  const classes = useStyles();

  return (
    <Grid item xs={8} md={10} component={Paper}>
      <Grid container spacing={1} alignItems="flex-end" justify="center">
        <Grid item>
          <NoteAddIcon />
        </Grid>
        <Grid item xs={10}>
        <TextField
          component={Link}
          to={'/create'}
          className={classes.textField}
          placeholder="Create post"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Create;