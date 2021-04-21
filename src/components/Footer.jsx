import React from 'react';

import '../styles/Footer.scss';

const Footer = () => (
  <div className="footer">
    { 'Feito com ❤️ em ' }
    <span>
      Belém/PA
    </span>

    <br />

    <a href="//mytdt.com.br" className="mytdt">
      My
      <span>TDT</span>
      { ' corp.' }
    </a>
  </div>
);

export default Footer;
