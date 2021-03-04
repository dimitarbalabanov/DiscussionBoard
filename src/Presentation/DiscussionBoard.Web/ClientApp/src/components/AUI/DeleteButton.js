import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
// import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  size: {
    fontSize: "10px"
  },
}));

const DeleteButton = props => {
  const classes = useStyles();
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

  console.log(props)
  return (
    <React.Fragment>
      { showDeleteConfirm ? 
        <React.Fragment>
          <Typography color="textSecondary" display="inline" variant="body2">
            Confirm deletion?
          </Typography>
          <Button size="small" startIcon={<DeleteIcon className={classes.iconColor}/>}>
            <Typography onClick={() => handleDelete()} color="textSecondary" display="inline" variant="body2">
                Yes
            </Typography> 
          </Button>
          <Button onClick={() => setShowDeleteConfirm(false)} size="small" startIcon={<NotInterestedIcon className={classes.iconColor}/>}>
          <Typography color="textSecondary" display="inline" variant="body2">
                Cancel
            </Typography>
          </Button>
        </React.Fragment>
        :
        <IconButton onClick={() => setShowDeleteConfirm(true)} aria-label="delete" size="small">
          <DeleteIcon fontSize="small"/>
        </IconButton>}
    </React.Fragment>
  );
}

export default React.memo(DeleteButton);