import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import GreyButton from './GreyButton';

const DeleteButton = props => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const {
    id,
    parentId,
    onDelete
  } = props;

  const handleDelete = () => {
    onDelete(id, parentId);
    setShowDeleteConfirm(false);
  };

  return (
    showDeleteConfirm ? 
      <React.Fragment>
        <Typography color="textSecondary" display="inline" variant="body2">
          DELETE?
        </Typography>
        <GreyButton title="No" icon={<NotInterestedIcon />} onClick={() => setShowDeleteConfirm(false)}/> 
        <GreyButton title="Yes" icon={<DeleteIcon />} onClick={() => handleDelete()}/> 
      </React.Fragment>
    :
      <GreyButton title="Delete" icon={<DeleteIcon color="another"/>} onClick={() => setShowDeleteConfirm(true)}/> 
  );
}

export default React.memo(DeleteButton);