import React, {useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    marginLeft: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
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
  const [type, setType] = useState('');

  const {
    commentId,
    //loading,
    //error,
    onCreateVote
  } = props;

  const handleTypeChange = (event, newType) => {
    setType(newType);
    const vote = {
      type: newType,
      commentId: commentId
    }
    onCreateVote(vote);
  };

  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <StyledToggleButtonGroup
          size="small"
          value={type}
          exclusive
          onChange={handleTypeChange}
        >
          <ToggleButton value="up">
            <ThumbUpIcon />
          </ToggleButton>
          <Divider flexItem orientation="vertical" className={classes.divider} />
          <ToggleButton value="down">
            <ThumbDownIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}

export default Voting;