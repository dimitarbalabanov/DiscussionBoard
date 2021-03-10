import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import useTraceUpdate from '../../hooks/useTraceUpdate';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(0)
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

const PostsSorting = props => {
  useTraceUpdate(props)
  const classes = useStyles();

  const {
    sort,
    top,
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
      <Grid item>
        <Paper elevation={0}>
          <Grid className={classes.statsItem} item >
            <StyledToggleButtonGroup
              value={sort}
              exclusive
              size="small"
              onChange={handleSelected}
            >
              <ToggleButton value={1} className={classes.asdf}>
                New
              </ToggleButton>
              <ToggleButton value={2}>
                Old
              </ToggleButton>
              <ToggleButton value={3}>
                Top
              </ToggleButton>
            </StyledToggleButtonGroup>
            {top !== '' ?  
              <FormControl variant="outlined" size="small" className={classes.formControl}>
                <InputLabel>Top</InputLabel>
                <Select
                  label="Top"
                  value={top}
                  onChange={handleTopClick}
                >
                  <MenuItem value={4}>All time</MenuItem>
                  <MenuItem value={1}>Today</MenuItem>
                  <MenuItem value={2}>This week</MenuItem>
                  <MenuItem value={3}>This month</MenuItem>
                </Select>
              </FormControl> : null}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default React.memo(PostsSorting);