import React from 'react';
import Box from '@material-ui/core/Box';
import logoImg from '../../assets/images/logoImg.png'; 
import logotekst from '../../assets/images/logotekst.png'; 

import pic from '../../assets/images/pic.png'; 
import tekst from '../../assets/images/tekst.png'; 

const Logo = () => {
  return (
    <Box display="flex" alignItems="center" pb={0}>
      <img 
        src={pic}
        //height="auto"
        width="40px"
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