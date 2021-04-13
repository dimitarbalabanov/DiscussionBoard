import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme) => ({
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(0),
    backgroundColor: theme.palette.common.white
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 180,
  }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(1),
    color: theme.palette.primary.main,
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    }
  },
}))(ToggleButtonGroup);

const PostsSorting2 = props => {
  const classes = useStyles();

  const {
    home,
    onSetSort,
    onSetTop
  } = props;

  const handleSelected = (event, newSelected) => {
    if (newSelected !== null) {
      onSetSort(newSelected);
      if (newSelected === 3) {
        onSetTop(4);
      }
      else {
        onSetTop('');
      }
    }
  };
  
  const handleTopClick = (event) => {
     onSetTop(event.target.value);
  }

  return (
    <Grid item xs={12} md={10}>
      <div className={classes.statsItem}>
        <StyledToggleButtonGroup
          value={home.sort}
          exclusive
          size="small"
          onChange={handleSelected}
        >
          <ToggleButton value={1}>
            New
          </ToggleButton>
          <ToggleButton value={2}>
            Old
          </ToggleButton>
          <ToggleButton value={3}>
            Top
          </ToggleButton>
        </StyledToggleButtonGroup>
        {home.top !== '' ?  
          <FormControl variant="outlined" size="small" className={classes.formControl}>
            <InputLabel>Top</InputLabel>
            <Select
              label="Top"
              value={home.top}
              onChange={handleTopClick}
            >
              <MenuItem value={4}>All time</MenuItem>
              <MenuItem value={1}>Today</MenuItem>
              <MenuItem value={2}>This week</MenuItem>
              <MenuItem value={3}>This month</MenuItem>
            </Select>
          </FormControl> : null}
      </div>
    </Grid>
  );
}

export default React.memo(PostsSorting2);