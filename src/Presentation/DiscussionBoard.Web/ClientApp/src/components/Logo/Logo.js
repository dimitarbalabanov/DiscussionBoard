import React from 'react';
import Box from '@material-ui/core/Box';
import logoImg from '../../assets/images/logoImg.png'; 
import logotekst from '../../assets/images/logotekst.png'; 

const Logo = () => {
  return (
    <Box>
      <img 
        style={{marginTop: "3px"}}
        src={logoImg}
        //height="auto"
        width="50px"
        alt="Discussion Board" 
        />
      <img 
        style={{marginTop: "3px"}}
        src={logotekst}
        //width="150"
        alt="Discussion Board"
        />
    </Box>
  );
};

export default Logo;