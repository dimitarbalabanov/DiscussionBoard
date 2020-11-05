import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
///import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField'
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    // borderColor: theme.palette.primary.main,
    // border: '3px solid'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(1)
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "24px"
  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    margin: theme.spacing(2),
    borderColor: theme.palette.primary.main,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  textField: {
    "&:hover": {
      cursor: 'theme.palette.primary.main'
    },
  }
}));

const CreatePostButton = props => {
  const classes = useStyles();
  const { isAuthenticated } = props;

  const field = isAuthenticated ? <TextField
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
      <Grid item>
            <Card className={classes.card} variant="outlined">
              <div className={classes.cardDetails}>
                {/* <CardHeader className={classes.header} /> */}
                <CardContent className={classes.cardcontent}>
                  <Grid className={classes.statsItem} item >
                    <NoteAddIcon className={classes.statsIcon} color="primary"/>
                    {field}
                  </Grid>
                </CardContent>
              </div>
            </Card>
      </Grid>
    </Grid>
  );
}

export default CreatePostButton;