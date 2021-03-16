import React from 'react';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import GreyButton from './GreyButton';

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

  return (
    createSavedPostLoading || deleteSavedPostLoading ? 
      <CircularProgress size={10} /> 
    : isSaved ? 
      <GreyButton title="Saved" onClick={() => onDeleteSavedPost(postId)} icon={<CheckBoxIcon />}/>
      : 
      <GreyButton title="Save" onClick={() => onCreateSavedPost(postId)} icon={<AddIcon />}/>
  );
}

export default React.memo(SavePostButton);