import React from 'react';
import Box from '@material-ui/core/Box';
import pic from '../../assets/images/pic.png'; 
import tekst from '../../assets/images/tekst.png'; 

const Logo = () => {
  return (
    <Box display="flex" alignItems="center" pb={0}>
      <img 
        src={pic}
        //height="auto"
        width="35px"
        alt="Discussion Board" 
        />
      <img 
        src={tekst}
        //width="150"
        alt="Discussion Board"
        />
    </Box>
  );
};

export default Logo;