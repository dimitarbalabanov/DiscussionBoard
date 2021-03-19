import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    //margin: 'auto'
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
    post,
    onDeleteComment,
    deleteCommentLoading,
    deleteCommentId,

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
    comment === undefined ? null : 
    <div className={classes.card}>
      {deleteCommentLoading && deleteCommentId === comment.id ?
        <Box ml={10} mt={2} mb={2}>
          <CircularProgress size={50}/>
        </Box> 
      : <Grid container>
            <CreatorAndCreatedOn creatorUserName={comment.creatorUserName} createdOn={comment.createdOn} />
            {showUpdateForm ? 
            <Grid md={12} item>
              <EditComment 
                onClose={handleClose}
                commentId={comment.id}
                content={comment.content}
                onUpdateComment={onUpdateComment}
                updateCommentLoading={updateCommentLoading}
              /> 
              </Grid>
            : <Grid className={classes.content} item >
                <Typography>
                  {updateCommentLoading && updateCommentId === comment.id 
                    ? <CircularProgress /> : comment.content}
                </Typography>
              </Grid>}
            {isAuthenticated ? 
              <Grid className={classes.margin} item >
                {createVoteLoading || updateVoteLoading || deleteVoteLoading ? 
                  <Box ml={3} mr={3}>
                    <CircularProgress size={10}/>
                  </Box> 
                : <Voting 
                  className={classes.voting}
                  id={comment.id}
                  voteType={comment.voteType}
                  voteId={comment.voteId}
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
                  orientation={'horizontal'}
                  backgroundColor={'#FFFFFF'}
                  />}
                <EditButton show={showUpdateForm} onOpen={handleOpen} onClose={handleClose}/>
                {deleteCommentLoading && deleteCommentId === comment.id ? 
                  <CircularProgress size={20}/>
                : <DeleteButton id={comment.id} parentId={post.id} onDelete={onDeleteComment} />}
              </Grid> 
              : null}
          </Grid>}
    </div>
  );
}

export default React.memo(CommentCard);