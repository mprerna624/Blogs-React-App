import React from 'react';
import logo from "../assets/logo.jpg";

function Logo({width = '100px', className=''}) {
  return (
    <img src={logo} alt='Logo' width={width} className={`rounded-lg ${className}`} />
  )
}

export default Logo