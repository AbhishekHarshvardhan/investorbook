import React from 'react';
import SearchBox from '../common/SearchBox/SearchBox';
import './MainNav.css';

const MainNav = ({ data, onChange }) => {
  return (
    <div className='ui secondary  menu tab-menu'>
      <div className='item tab-title'>{data.title}</div>
      {data.btn}
      <div className='right menu sm-hide'>
        <div className='item'></div>
        <div className='item'>
          <SearchBox onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default MainNav;
