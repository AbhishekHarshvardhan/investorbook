import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className='ui large secondary menu'>
      <div className='brand-logo'>
        <Link className='pointer' to='/'>
          <span className='text-primary'>INVESTOR</span>BOOK
        </Link>
      </div>
    </div>
  );
};

export default Header;
