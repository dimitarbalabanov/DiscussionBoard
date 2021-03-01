import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  size: {
    fontSize: "10px"
  },
}));

const SavePostButton = props => {
  const classes = useStyles();
  
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
    createSavedPostLoading || deleteSavedPostLoading 
      ? 
        <CircularProgress size={10} /> 
      :
        isSaved 
          ? 
            <Button onClick={() => onDeleteSavedPost(postId)} size="small" startIcon={<CheckBoxIcon className={classes.iconColor}/>}>
              <Typography color="textSecondary" display="inline" variant="body2">
                  Saved
              </Typography>
            </Button>
          :
            <Button size="small" startIcon={<AddIcon className={classes.iconColor}/>}>
              <Typography onClick={() => onCreateSavedPost(postId)} color="textSecondary" display="inline" variant="body2">
                  Save
              </Typography> 
            </Button>
  );
}

export default React.memo(SavePostButton);