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
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  score: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  blue: {
    color: blue[500],
  },
  red: {
    color: red[500]
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

  let upIcon = <ThumbUpIcon/>;
  if (type === 'up') {
    upIcon = <ThumbUpIcon className={classes.blue}/>
  }

  let downIcon = <ThumbDownIcon />
  if (type === 'down') {
    downIcon = <ThumbDownIcon className={classes.red}/>
  }

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <StyledToggleButtonGroup
          size="small"
          orientation="vertical"
          value={type}
          exclusive
          onChange={handleTypeChange}
        >
          <ToggleButton value="up">
            {upIcon}
          </ToggleButton>
          <Typography color="textSecondary" display="inline" variant="body2" align="center" className={classes.score}>
             0
          </Typography>
          <ToggleButton value="down">
            {downIcon}
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}

export default PostVoting;