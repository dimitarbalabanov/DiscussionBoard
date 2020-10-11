import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const ConfirmDialog = props => {
  const [open, setOpen] = React.useState(false);

  const {
    id,
    title,
    onDelete
  } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(id);
    setOpen(false);
  };

  const handleClose = () => {
    
  };

  return (
    <div>
      <Button variant="outlined" size="small" onClick={handleClickOpen}>
      <Typography color="textSecondary" display="inline" variant="body2" >
        Delete
      </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{`Delete this ${title}?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDialog;