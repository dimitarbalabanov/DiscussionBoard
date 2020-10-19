import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Voting from '../../Voting/Voting';
import ConvertToRelativeTime from '../../../utils/dateConvertor';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    border: 'none',
    boxShadow: 'none'
  },
  cardDetails: {
    flex: 1
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(1)
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "18px",
    color: theme.palette.text.secondary
  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    margin: theme.spacing(2),
    marginLeft: theme.spacing(0)
  },
  textColor: {
    color: theme.palette.primary.main
  },
  iconColor: {
    color: theme.palette.text.secondary
  }
}));

const CommentCard = props => {
  const classes = useStyles();
  const { 
    comment,
    loading,
    onDeleteComment,
    deleteCommentLoading,
    deleteCommentId 
  } = props;

  return (
    <React.Fragment>
      <Divider />
      <Card className={classes.card}>
        <Voting className={classes.voting}/>
        <div className={classes.cardDetails}>
          <CardContent className={classes.cardcontent}>
            <Grid className={classes.statsItem} item >
              <Typography color="textSecondary" display="inline" variant="body2" >
                {loading ? <Skeleton /> : <span> by <strong className={classes.textColor}>{comment.creatorUserName}</strong> posted {ConvertToRelativeTime(comment.createdOn)}</span>} 
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item >
              <Typography>
                {loading ? <Skeleton /> : comment.content}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item >
              <Button size="small" startIcon={<EditIcon className={classes.iconColor}/>}>
                <Typography color="textSecondary" display="inline" variant="body2">
                  Edit
                </Typography>
              </Button>
                <Button onClick={() => onDeleteComment(comment.id)} size="small" startIcon={<DeleteIcon className={classes.iconColor}/>}>
                  {deleteCommentLoading && comment.id === deleteCommentId 
                    ? <CircularProgress /> 
                    : <Typography color="textSecondary" display="inline" variant="body2">
                        Delete
                      </Typography> 
                  }
                </Button>
            </Grid>
          </CardContent>
        </div>
      </Card>
    </React.Fragment>
  );
}

export default CommentCard;