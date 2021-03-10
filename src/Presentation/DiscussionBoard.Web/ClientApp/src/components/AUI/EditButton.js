import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const EditButton = props => {

  const {
    show,
    onOpen,
    onClose
  } = props;

  return (
       show ? 
          <Button onClick={onClose} size="small" startIcon={<NotInterestedIcon />}>
            <Typography color="textSecondary" display="inline" variant="body2">
                Cancel
            </Typography>
          </Button>
        :
        <Button onClick={onOpen} size="small" startIcon={<EditIcon />}>
          <Typography color="textSecondary" display="inline" variant="body2">
            Edit
          </Typography>
        </Button>
    );
  }

export default React.memo(EditButton);