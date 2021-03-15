import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import GreyButton from './GreyButton';

const EditButton = props => {

  const {
    show,
    onOpen,
    onClose
  } = props;

  return (
    show ? 
      <GreyButton title="cancel" onClick={onClose} icon={<NotInterestedIcon />} />
      :
      <GreyButton title="edit" onClick={onOpen} icon={<EditIcon />} />
  );
}

export default React.memo(EditButton);