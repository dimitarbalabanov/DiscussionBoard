import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  //Box,
  //Card,
  //CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

const SearchToolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      {/* <Box mt={3} width="25%">
        <Card>
          <CardContent>
            <Box maxWidth={500}> */}
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <Search />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search in forums"
                
              />
            {/* </Box>
          </CardContent>
        </Card>
      </Box> */}
    </div>
  );
};

SearchToolbar.propTypes = {
  className: PropTypes.string
};

export default SearchToolbar;
