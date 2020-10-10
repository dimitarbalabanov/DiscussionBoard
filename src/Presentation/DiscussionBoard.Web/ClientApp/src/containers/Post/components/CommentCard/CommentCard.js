import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import ScoreIcon from '@material-ui/icons/Score';
import Voting from '../Voting/Voting';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Snackbar from '../../../../components/GlobalSnackbar/GlobalSnackbar';
import ConvertToRelativeTime from '../../../../utils/dateConvertor';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    border: "none",
    boxShadow: "none"
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  pad: {
    padding: theme.spacing(3)
  }
}));

const CommentCard = props => {
  const classes = useStyles();
  const { 
    id,
    content,
    creatorUserName,
    createdOn,
    votesScore,
    currentUserHasVoted,
    currentUserVoteType
  } = props.comment;
  
  const {
    deleteCommentLoading,
    deleteCommentError,
    deleteCommentSuccess,
    onDeleteCommentReset,
    onDeleteComment,
    createVoteLoading
  } = props;

  return (
    <Grid item xs={12} className={classes.pad}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Avatar />
            <Typography variant="subtitle1" color="textSecondary">
              {creatorUserName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {ConvertToRelativeTime(createdOn)}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {content}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {currentUserHasVoted ? "votnal sym" : "ne sym votnal be"}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {currentUserVoteType ?? "nema taip"}
            </Typography>
            <Grid className={classes.statsItem} item >
              <ScoreIcon className={classes.statsIcon} color="action" />
              <Typography color="textSecondary" display="inline" variant="body2" >
               {createVoteLoading ? <CircularProgress /> : <React.Fragment>{votesScore} {' '} Score</React.Fragment> }
              </Typography>
              <Voting
                onCreateVote={props.onCreateVote}
                commentId={id}
                currentUserHasVoted={currentUserHasVoted}
                currentUserVoteType={currentUserVoteType}
                //loading={loading} 
                //error={error} 
                //onCreateVote={onCreateVote}
              />
              {deleteCommentLoading 
                ? <CircularProgress />
                : <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={() => onDeleteComment(id)}
                >
                  Delete
                </Button> }
                { deleteCommentError ? <Snackbar message={deleteCommentError} type={"error"} reset={onDeleteCommentReset} /> : null}
                { deleteCommentSuccess ? <Snackbar message="Successfully deleted the comment." type={"info"} reset={onDeleteCommentReset} /> : null}
            </Grid>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object,
};

export default CommentCard;