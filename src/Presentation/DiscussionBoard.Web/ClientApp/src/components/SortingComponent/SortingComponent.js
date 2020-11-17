import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    // borderColor: theme.palette.primary.main,
    // border: '3px solid'
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
    margin: theme.spacing(1)
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    fontSize: "24px"
  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    margin: theme.spacing(2),
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
  }
}));

const SortingComponent = props => {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);

  return (
    <Grid item xs={12} md={10}>
      <Grid item>
        <Card className={classes.card} variant="outlined">
          <div className={classes.cardDetails}>
            {/* <CardHeader className={classes.header} /> */}
            <CardContent className={classes.cardcontent}>
              <Grid className={classes.statsItem} item >
                <NoteAddIcon className={classes.statsIcon} color="primary"/>
                <FormControl variant="outlined" size="small" className={classes.formControl}  >
                  <InputLabel id="sort">Sort</InputLabel>
                  <Select
                    labelId="sort"
                    label="Sort"
                    name="sortId"
                  >
                    <MenuItem key={1} value={1} onClick={() => setShow(false)}>New</MenuItem>
                    <MenuItem key={2} value={2} onClick={() => setShow(false)}>Old</MenuItem>
                    <MenuItem key={3} value={3} onClick={() => setShow(true)}>Top</MenuItem>
                  </Select>
                </FormControl>
                {show ? 
                <FormControl variant="outlined" size="small" className={classes.formControl}>
                  <InputLabel id="top">Top</InputLabel>
                  <Select
                    labelId="top"
                    label="Top"
                    name="topId"
                  >
                    <MenuItem key={1} value={1}>Today</MenuItem>
                    <MenuItem key={2} value={2}>This week</MenuItem>
                    <MenuItem key={3} value={3}>This month</MenuItem>
                    <MenuItem key={4} value={4}>All time</MenuItem>
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

export default SortingComponent;