import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';

import useTraceUpdate from '../../hooks/useTraceUpdate';
const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    // borderColor: theme.palette.primary.main,
    // border: '3px solid'
    // borderStyle: "solid",
    // borderWidth: "1.5px 1.5px 1.5px 1.5px",
    // borderRadius: '5px',
    // borderColor: theme.palette.primary.main,
    // '&:hover': {
    //   borderColor: theme.palette.secondary.main,
    // }
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(0)
  },
  statsIcon: {
    marginRight: theme.spacing(0),
    fontSize: "24px"
  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    margin: theme.spacing(0),
    borderColor: theme.palette.primary.main,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  textField: {
    "&:hover": {
      cursor: 'theme.palette.primary.main'
    },
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 180,
  },
  asdf: {
      color: theme.palette.primary.main,

    outlined: {
      color: theme.palette.primary.main,
      '&$disabled': { color: theme.palette.secondary.main },
    },
    outlinedPrimary: {
      color: theme.palette.secondary.main,
      '&:hover': { color: theme.palette.secondary.main },
     },
  },
    
}));
    const toggleStyles = makeStyles({
      root: { /* … */ },
      label: { /* … */ },
      outlined: {
        /* … */
        '&$disabled': { /* … */ },
      },
      outlinedPrimary: {
        /* … */
        '&:hover': { /* … */ },
       },
      disabled: {},
    }, { name: 'MuiButton' })

const options = [
  {
    value: 1,
    label: "New"
  },
  {
    value: 2,
    label: "Old"
  },
  {
    value: 3,
    label: "Top"
  }
];

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

const SortingComponent = props => {
  useTraceUpdate(props)
  const classes = useStyles();

  const {
    sort,
    top,
    onSetSort,
    onSetTop
  } = props;

  const [show, setShow] = React.useState(false);


  const handleSelected = (event, newSelected) => {
    if (newSelected !== null) {
      onSetSort(newSelected);
      if (newSelected === 3) {
        onSetTop(1)
        setShow(true);
      } else {
        onSetTop('');
        setShow(false);
      }
    }
  };
  
  const handleTopClick = (event) => {
    onSetTop(event.target.value);
  }

  return (
    <Grid item xs={12} md={10}>
      <Grid item>
        <Card className={classes.card} variant="outlined">
          <div className={classes.cardDetails}>
            {/* <CardHeader className={classes.header} /> */}
            <CardContent className={classes.cardcontent}>
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
                {/* <NoteAddIcon className={classes.statsIcon} color="primary"/>
                <FormControl variant="outlined" size="small" className={classes.formControl}  >
                  <InputLabel>Sort</InputLabel>
                  <Select
                    label="Sort"
                    value={sort}
                    onChange={handleSortClick}
                  >
                    <MenuItem value={1}>New</MenuItem>
                    <MenuItem value={2}>Old</MenuItem>
                    <MenuItem value={3}>Top</MenuItem>
                  </Select>
                </FormControl> */}
                {show ? 
                <FormControl variant="outlined" size="small" className={classes.formControl}>
                  <InputLabel>Top</InputLabel>
                  <Select
                    label="Top"
                    value={top}
                    onChange={handleTopClick}
                  >
                    <MenuItem value={1}>Today</MenuItem>
                    <MenuItem value={2}>This week</MenuItem>
                    <MenuItem value={3}>This month</MenuItem>
                    <MenuItem value={4}>All time</MenuItem>
                  </Select>
                </FormControl>
                : null}
              </Grid>
            </CardContent>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

export default React.memo(SortingComponent);