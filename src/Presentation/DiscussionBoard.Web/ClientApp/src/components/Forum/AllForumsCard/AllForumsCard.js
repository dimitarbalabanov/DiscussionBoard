import React from 'react';
import { Link as RouterLink} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Spinner from '../../Spinner/Spinner';
import Link from '@material-ui/core/Link';
import leaves from '../../../assets/images/leaves.jpg'
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
    color: theme.palette.common.black,
    fontSize: "15px",

  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default,
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  button: {
    //marginTop: theme.spacing(1)
    textTransform: 'none',
    borderRadius: '50px',
    color: theme.palette.background.default,

    '&:hover': {
      backgroundColor: theme.palette.primary.secondary,
    },
    
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
//    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

const AllForumsCard = props => {
  const classes = useStyles();

  const { 
    forums,
    allIds,
    loading
  } = props;

  return (
    <Grid item md={10}>
    <Card className={classes.card} variant="outlined">
      <div className={classes.cardDetails}> 
          <Typography className={classes.header} component="h3" variant="h5">
              {"Forums"}
          </Typography>
          <CardContent>
          {loading ? <Spinner /> : allIds.map(id => 
            <Box display='flex' alignItems="center" justifyContent='space-between' mb={1} key={id}>
              <Box display='flex' alignItems="center">
                <Box> 
                  <Avatar
                  className={classes.avatar}
                  //src={forums[id].mediaUrl}
                  src={leaves}
                  />
                </Box>
                <Box>
                  <Link component={RouterLink} to={`forums/${id}`} className={classes.title}>
                    {"f/"}{forums[id].title}
                  </Link>
                </Box>
              </Box> 
              <Box>
                <Button
                  component={RouterLink}
                  to={`forums/${id}`}
                  color="primary"
                  variant="contained"
                  size="small"
                  disableElevation
                  className={classes.button}>
                  {"Browse"}
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </div>
    </Card>
    </Grid>
  );
}

export default AllForumsCard;