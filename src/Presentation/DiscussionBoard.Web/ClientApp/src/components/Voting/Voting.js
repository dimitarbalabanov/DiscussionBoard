import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ArrowUpward';
import ThumbDownIcon from '@material-ui/icons/ArrowDownward';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { blue, red, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    marginTop: theme.spacing(2)
    //marginLeft: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(1, 0.5),
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

const Voting = props => {
  
  const {
    commentId,
    //loading,
    //error,
    //onCreateVote
  } = props;

  let currentUserVoteType = props.currentUserVoteType ? props.currentUserVoteType.toLowerCase() : '';
  const [type, setType] = useState(currentUserVoteType);
  
  const handleTypeChange = (event, newType) => {
    //if (!type) {
      setType(newType);
      // const vote = {
      //   type: newType,
      //   commentId: commentId
      // }
      // onCreateVote(vote);
    //}
    //alert('glasuval si momche')
  };

  const classes = useStyles();

  let upIcon = <ThumbUpIcon/>;
  if(type === 'up') {
    upIcon = <ThumbUpIcon className={classes.blue}/>
  }

  let downIcon = <ThumbDownIcon />
  if(type === 'down') {
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
          {/* <Divider flexItem orientation="horizontal" className={classes.divider} /> */}
          <Typography color="textSecondary" display="inline" variant="body2" align="center">
            105
          </Typography>
          {/* <Divider flexItem orientation="horizontal" className={classes.divider} /> */}
          <ToggleButton value="down">
            {downIcon}
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}

export default Voting;