import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 60,
  },
  text: {
    //marginTop: theme.spacing(0.3),
    marginRight: theme.spacing(1)
  },
}));

const CommentsSorting = props  => {
  const classes = useStyles();
  const [sort, setSort] = React.useState(1); 

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box 
      display="flex"
      alignContent="center"
      ml={2} 
     >
      <Typography className={classes.text} color="textSecondary" display="inline" variant="body2">
        SORT BY 
      </Typography>
      <FormControl size="small" className={classes.formControl}>
        <Select
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value={1}>
              <Typography color="textSecondary" display="inline" variant="body2">NEW</Typography>
            </MenuItem>
          <MenuItem value={2}>
              <Typography color="textSecondary" display="inline" variant="body2">OLD</Typography>
            </MenuItem>
          <MenuItem value={3}>
               <Typography color="textSecondary" display="inline" variant="body2">TOP</Typography>
            </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CommentsSorting;
