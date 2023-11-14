// Layout.js
import React from 'react';
import Header from './Header';
import {useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  var _layout="default"
  try {
    _layout=children.props.children.find(x=>x.props.path===location.pathname).props.layout;
    
  } catch (error) {
    _layout="default";
    
  }
  return (
    
    <div>
    {_layout=="default" && <div> <Header /> <main>{children}</main>  </div> }
    {_layout=="pdf" && <div><main>{children}</main></div> }
    {_layout=="pdfheader" && <div><Header /><main>{children}</main></div> }

    
    </div>
  );
};

export default Layout;
