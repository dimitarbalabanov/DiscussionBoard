import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
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
    margin: theme.spacing(1)
  },
  divider: {
    marginBottom: theme.spacing(1)
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  avatar: {
    height: 35,
    width: 35,
    display: 'flex',
    marginRight: theme.spacing(1)
  },
}));

const PopularForumsCard = props => {
  const classes = useStyles();

  React.useEffect(() => console.log("trending forums rendering"))
  const { 
    forums,
    loading
  } = props;

  return (
    <Grid item md={10}>
      <Card className={classes.card} variant="outlined">
        <div className={classes.cardDetails}>
          <CardHeader className={classes.header}/>
          <CardContent>
          <Typography component="h2" variant="h4">
            {"Trending forums"}
            <Divider className={classes.divider}/>
            </Typography>
            {loading ? <h1>Loading...</h1> : forums.map(forum =>
              <React.Fragment key={forum.id}>
                <Grid container alignItems="center" className={classes.divider}>
                  <Grid item> <Avatar
                  className={classes.avatar}
                  //src={forum.mediaUrl}
                  /></Grid>
                  <Grid item><Link display="block" variant="body1" component={RouterLink} to={`/forums/${forum.id}`}>
                  {"f/" + forum.title.substring(0,10).toLowerCase()}
                </Link></Grid>
                </Grid>
                {/* <Typography className={classes.title} component={Link} to={`/forums/${forum.id}`} variant="h5" align="center">
                  {"f/" + forum.title.substring(0,10).toLowerCase()}
                </Typography> */}
                <Divider className={classes.divider}/>
              </React.Fragment>)
            }
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

export default React.memo(PopularForumsCard);