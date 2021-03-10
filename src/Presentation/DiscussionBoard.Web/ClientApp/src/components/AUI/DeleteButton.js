import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
// import CircularProgress from '@material-ui/core/CircularProgress';

const DeleteButton = props => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // const {
  //   id,
  //   title,
  //   onDelete
  // } = props;

  const handleDelete = () => {
    // onDelete(id);
    setShowDeleteConfirm(false);
  };

  const { 
    // comment,
    // loading,
    // onDeleteComment,
    // deleteCommentLoading,
    // deleteCommentId,
    // isAuthenticated
  } = props;

  return (
     showDeleteConfirm ? 
        <React.Fragment>
          <Typography color="textSecondary" display="inline" variant="body2">
            DELETE?
          </Typography>
          <Button size="small" startIcon={<DeleteIcon />}>
            <Typography onClick={() => handleDelete()} color="textSecondary" display="inline" variant="body2">
                Yes
            </Typography> 
          </Button>
          <Button onClick={() => setShowDeleteConfirm(false)} size="small" startIcon={<NotInterestedIcon />}>
            <Typography color="textSecondary" display="inline" variant="body2">
                Cancel
            </Typography>
          </Button>
        </React.Fragment>
        :
        <Button onClick={() => setShowDeleteConfirm(true)} size="small" startIcon={<DeleteIcon />}>
          <Typography color="textSecondary" display="inline" variant="body2">
            Delete
          </Typography> 
        </Button>
  );
}

export default React.memo(DeleteButton);