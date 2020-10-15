import React from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: theme.palette.primary.main,
  }
}));

export default function VerticalToggleButtons() {
  const [view, setView] = React.useState('list');
  const classes = useStyles();

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
      <ToggleButton value="list" aria-label="list">
        <ArrowDropUpIcon />
      </ToggleButton>
      <ToggleButton value="module" aria-label="module">
        <ArrowDropDownIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}