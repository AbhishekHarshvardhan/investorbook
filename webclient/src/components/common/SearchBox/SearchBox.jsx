import React from 'react';

const SearchBox = ({ value, onChange }) => {
  const [showInput, setShowInput] = React.useState(false);

  if (!showInput)
    return (
      <i
        onClick={() => setShowInput(true)}
        className='search large icon pointer'
      />
    );
  return (
    <div className='ui icon large input'>
      <input
        onBlur={() => setShowInput(false)}
        name='query'
        className='search-input'
        type='text'
        value={value}
        placeholder='Search...'
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <i className='search  icon pointer' />
    </div>
  );
};

export default SearchBox;
