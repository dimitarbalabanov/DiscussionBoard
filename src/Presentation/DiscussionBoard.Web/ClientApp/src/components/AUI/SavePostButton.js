import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';

const SavePostButton = props => {
  
  const {
    postId,
    isSaved,
    onCreateSavedPost,
    createSavedPostError,
    createSavedPostLoading,
    onDeleteSavedPost,
    deleteSavedPostError,
    deleteSavedPostLoading
  } = props;

  console.log(props)
  return (
    createSavedPostLoading || deleteSavedPostLoading ? 
      <CircularProgress size={10} /> 
    : isSaved ? 
        <Button onClick={() => onDeleteSavedPost(postId)} size="small" startIcon={<CheckBoxIcon />}>
          <Typography color="textSecondary" display="inline" variant="body2">
              Saved
          </Typography>
        </Button>
      : <Button size="small" startIcon={<AddIcon />}>
          <Typography onClick={() => onCreateSavedPost(postId)} color="textSecondary" display="inline" variant="body2">
              Save
          </Typography> 
        </Button>
  );
}

export default React.memo(SavePostButton);