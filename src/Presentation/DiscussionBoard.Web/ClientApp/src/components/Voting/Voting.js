import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { red, green  } from '@material-ui/core/colors';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(0.5),
    // backgroundColor: '#F8F8F8'
  },
  blue: {
    color: green[500],
  },
  red: {
    color: red[600]
  },
  icon: {
    fontSize: '40px',
    margin: theme.spacing(-2),
    '$:hover' :{
      color: green[500]
      }
  },
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  score: {
    fontWeight: 'bold'
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
  const classes = useStyles();
  
  const {
    id,
    votesScore,
    voteType,
    voteId,
    onCreateVote,
    onUpdateVote,
    onDeleteVote,
    isAuthenticated,
    orientation = "vertical",
    backgroundColor = '#F8F8F8'
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

  return (
    <div className={classes.paper} style={{backgroundColor: backgroundColor}}>
      <StyledToggleButtonGroup
        size="small"
        orientation={orientation}
        value={voteType}
        exclusive
        onChange={handleTypeChange}
      >
        <ToggleButton value="1" disabled={!isAuthenticated} className={classes.button}>
          {voteType === '1' ? 
            <ArrowDropUpIcon className={`${classes.blue} ${classes.icon}`}/>
           : <ArrowDropUpIcon className={classes.icon}/>}
        </ToggleButton>
        <Typography color="textSecondary" display="inline" variant="body2" align="center" className={classes.score}>
          {votesScore}
        </Typography>
        <ToggleButton value="-1" disabled={!isAuthenticated} className={classes.button}>
          {voteType === '-1' ? <ArrowDropDownIcon className={`${classes.red} ${classes.icon}`}/> : <ArrowDropDownIcon className={classes.icon}/>}
        </ToggleButton>
      </StyledToggleButtonGroup>
    </div>
  );
}

export default Voting;