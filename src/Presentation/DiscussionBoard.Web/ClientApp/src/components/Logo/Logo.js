import React from 'react';
import logo from '../../assets/images/logo.png'; 

const Logo = () => {
  return (
      <img 
      style={{marginTop: "3px"}}
      src={logo}
      width="150"
      alt="Discussion Board" />
  );
};

export default Logo;