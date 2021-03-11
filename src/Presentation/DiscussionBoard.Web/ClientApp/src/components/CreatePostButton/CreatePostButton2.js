import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Divider from '@material-ui/core/Divider';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CommentIcon from '@material-ui/icons/Comment';
import AnotherSpinner from '../Spinner/AnotherSpinner';
import logotekst from '../../assets/images/logotekst.png'; 

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    // borderColor: theme.palette.primary.main,
    // border: '1px solid'
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "18px"
  },
  title: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    color: theme.palette.background.default,
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  button: {
    //marginTop: theme.spacing(1)
  },
  text: {
    color: theme.palette.background.default
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderColor: theme.palette.primary.main,
    border: "1px solid"
  },
  avatar: {
    height: 30,
    width: 30,
    display: 'flex',
    //marginRight: theme.spacing(-1),
  },
  div : {
    borderBottom: "1px solid",
    borderColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

const TredingForumsCard = props => {
  const classes = useStyles();



  return (
    
    <Grid item md={10}>

    <Card className={classes.card} variant="outlined">
      <div className={classes.cardDetails}> 
          {/* <Typography className={classes.header} component="h3" variant="h5">
              <span className={classes.asdf}>{"Treding forums"}</span>
          </Typography> */}
          <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <img 
              style={{marginTop: "3px"}}
              src={logotekst}
              //width="150"
              alt="Discussion Board"
              />
          </Box>
            <Grid container justify="center" spacing={2} >
              <Grid className={classes.statsItem} item>
                <Button
                 component={Link}
                 to={"posts/create"}
                  size="small"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<NoteAddIcon />}
                >
                  Create a post
                </Button>
              </Grid>
            </Grid>
        </CardContent>
      </div>
    </Card>
    </Grid>
  );
}

export default TredingForumsCard;