import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { blue, red, green  } from '@material-ui/core/colors';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0.5),
  },
  blue: {
    color: green[500],
  },
  red: {
    color: red[500]
  },
  icon: {
    fontSize: '40px',
    margin: theme.spacing(-2),
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    }
  }
}))(ToggleButtonGroup);

const Voting = props => {
  
  const {
    id,
    votesScore,
    voteType,
    voteId,
    createVoteLoading,
    //createVoteError,
    updateVoteLoading,
    //updateVoteError,
    deleteVoteLoading,
    //deleteVoteError,
    onCreateVote,
    onUpdateVote,
    onDeleteVote,
    isAuthenticated
  } = props;

  const handleTypeChange = (event, newType) => {
    if (!voteType) {
      onCreateVote(id, newType)
    } else if (voteType && newType && newType !== voteType) {
      onUpdateVote(id, voteId, newType)
    } else if (newType === null) {
      onDeleteVote(id, voteId, voteType)
    }
  };

  const classes = useStyles();

  let upIcon = <ArrowDropUpIcon className={classes.icon}/>;
  if (voteType === '1') {
    upIcon = <ArrowDropUpIcon className={`${classes.blue} ${classes.icon}`}/>
  }

  let downIcon = <ArrowDropDownIcon className={classes.icon}/>
  if (voteType === '-1') {
    downIcon = <ArrowDropDownIcon className={`${classes.red} ${classes.icon}`}/>
  }

  return (
    <Paper elevation={0} className={classes.paper}>
      <StyledToggleButtonGroup
        size="small"
        orientation="vertical"
        value={voteType}
        exclusive
        onChange={handleTypeChange}
      >
        <ToggleButton value="1" disabled={!isAuthenticated} className={classes.button}>
          {voteType === '1' ? <ArrowDropUpIcon className={`${classes.blue} ${classes.icon}`}/> : <ArrowDropUpIcon className={classes.icon}/>}
        </ToggleButton>
        <Typography color="textSecondary" display="inline" variant="body2" align="center" className={classes.score}>
        {createVoteLoading || updateVoteLoading || deleteVoteLoading ? <CircularProgress size={15}/> : votesScore}
        </Typography>
        <ToggleButton value="-1" disabled={!isAuthenticated} className={classes.button}>
          {downIcon}
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
}

export default Voting;