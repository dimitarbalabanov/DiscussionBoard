import React from 'react';
import logo from '../../assets/images/logo.png'; 

const Logo = () => {
  return (
      <img 
      style={{marginTop: "3px"}}
      src={logo}
      width="60"
      alt="DiscBoard" />
  );
};

export default Logo;