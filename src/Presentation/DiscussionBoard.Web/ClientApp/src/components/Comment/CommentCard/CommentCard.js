import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditComment from '../EditComment/EditComment';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteButton from '../../AUI/DeleteButton';
import EditButton from '../../AUI/EditButton';
import CreatorAndCreatedOn from '../../AUI/CreatorAndCreatedOn';
import Voting from '../../Voting/Voting';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const CommentCard = props => {
  const classes = useStyles();
  const [showUpdateForm, setUpdateForm] = useState(false);

  const handleOpen = () => {
    setUpdateForm(true);
  }

  const handleClose = () => {
    setUpdateForm(false);
  }

  const { 
    comment,
    loading,
    // onDeleteComment,
    // deleteCommentLoading,
    // deleteCommentId,
    onUpdateComment,
    updateCommentLoading,
    updateCommentId,
    onCreateVote,
    createVoteLoading,
    createVoteError,
    onUpdateVote,
    updateVoteError,
    updateVoteLoading,
    onDeleteVote,
    deleteVoteError,
    deleteVoteLoading,
    isAuthenticated
  } = props;

  return (
    <div className={classes.card}>
      <Voting 
        className={classes.voting}
        commentId={comment.id}
        currentUserVoteType={comment.currentUserVoteType}
        currentUserVoteId={comment.currentUserVoteId}
        votesScore={comment.votesScore}
        onCreateVote={onCreateVote}
        createVoteLoading={createVoteLoading}
        createVoteError={createVoteError}
        onUpdateVote={onUpdateVote}
        updateVoteError={updateVoteError}
        updateVoteLoading={updateVoteLoading}
        onDeleteVote={onDeleteVote}
        deleteVoteError={deleteVoteError}
        deleteVoteLoading={deleteVoteLoading}
        isAuthenticated={isAuthenticated}
      />
      <div>
        <CreatorAndCreatedOn creatorUserNaname={comment.creatorUserName} createdOn={comment.createdOn} />
        {showUpdateForm 
          ? <EditComment 
              onClose={handleClose}
              commentId={comment.id}
              content={comment.content}
              onUpdateComment={onUpdateComment}
              updateCommentLoading={updateCommentLoading}
            /> 
          : 
            <Grid className={classes.margin} item >
              <Typography>
                {loading || (updateCommentLoading && updateCommentId) === comment.id 
                  ? <CircularProgress /> : comment.content}
              </Typography>
            </Grid>}
        {isAuthenticated 
          ? 
            <Grid className={classes.margin} item >
              <EditButton show={showUpdateForm} onOpen={handleOpen} onClose={handleClose}/>
              <DeleteButton />
            </Grid> 
          : 
            null}
      </div>
    </div>
  );
}

export default React.memo(CommentCard);