import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ArrowUpward';
import ThumbDownIcon from '@material-ui/icons/ArrowDownward';
//import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { blue, red,  } from '@material-ui/core/colors';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
//import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    //border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0.5),
    //width: '50%'
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  score: {
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
  },
  blue: {
    color: blue[500],
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
  },
  // active: {
  //   '&:active': {
  //     color: green[500],
  //   },
  // },
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
    },
    
  },
}))(ToggleButtonGroup);

const PostVoting = props => {
  
  // const {
  //   commentId,
  //   votesScore,
  //   currentUserVoteType,
  //   currentUserVoteId,
  //   createVoteLoading,
  //   //createVoteError,
  //   onCreateVote,
  //   onUpdateVote,
  //   //updateVoteError,
  //   updateVoteLoading,
  //   onDeleteVote,
  //   //deleteVoteError,
  //   deleteVoteLoading,
  //   isAuthenticated
  // } = props;
  
 // let voteType = currentUserVoteType ? currentUserVoteType : null;
  const [type, setType] = useState(null);
  
  const handleTypeChange = (event, newType) => {
    // if (!type) {
    //   onCreateVote(commentId, newType)
    // } else if (type && newType && newType !== type) {
    //   onUpdateVote(commentId, currentUserVoteId, newType)
    // } else if (newType === null) {
    //   onDeleteVote(commentId, currentUserVoteId, type)
    // }
    setType(newType);
  };

  const classes = useStyles();

  let upIcon = <ArrowDropUpIcon className={classes.icon}/>;
  if (type === 'up') {
    upIcon = <ArrowDropUpIcon className={`${classes.blue} ${classes.icon}`}/>
  }

  let downIcon = <ArrowDropDownIcon className={classes.icon}/>
  if (type === 'down') {
    downIcon = <ArrowDropDownIcon className={`${classes.red} ${classes.icon}`}/>
  }

  return (
    <Paper elevation={0} className={classes.paper}>
      <StyledToggleButtonGroup
        size="small"
        orientation="vertical"
        value={type}
        exclusive
        onChange={handleTypeChange}
      >
        <ToggleButton value="up" className={classes.button}>
          {upIcon}
        </ToggleButton>
        <Typography color="textSecondary" display="inline" variant="body2" align="center" className={classes.score}>
            0
        </Typography>
        <ToggleButton value="down" className={classes.button}>
          {downIcon}
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
}

export default PostVoting;