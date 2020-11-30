import React from 'react';

const Loader = () => {
  return (
    <div
      className='ui segment'
      style={{
        height: '400px',
      }}
    >
      <div className='ui active inverted dimmer'>
        <div className='ui text loader'>Loading</div>
      </div>
      <p />
    </div>
  );
};

export default Loader;
