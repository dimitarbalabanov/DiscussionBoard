import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const DeleteModal = props => {

  const {
    show,
    handleClose,
    id,
    title,
    onDelete
  } = props;

  const handleDelete = () => {
    //onDelete(id);
    handleClose();
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>{`Delete this ${title}?`}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;