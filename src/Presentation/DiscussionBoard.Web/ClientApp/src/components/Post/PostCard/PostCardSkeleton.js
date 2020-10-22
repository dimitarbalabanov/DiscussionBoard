import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    }
  },
  cardDetails: {
    flex: 1
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(1)
  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    margin: theme.spacing(2)
  }
}));

const PostCardSkeleton = () => {

  const classes = useStyles();
  
  return (
    <Card className={classes.card} variant="outlined">
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardcontent}>
            <Skeleton component={Typography} width={320} className={classes.statsItem} color="textSecondary" display="inline" variant="body2"/>
            <Skeleton component={Typography} className={classes.statsItem} component="h2" variant="h4"/>
            <Skeleton component={Typography} width={120} className={classes.statsItem} color="textSecondary" display="inline" variant="body2"/>
        </CardContent>
      </div>
    </Card>
  );
}

export default PostCardSkeleton;