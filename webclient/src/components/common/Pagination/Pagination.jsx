import React from 'react';
import './Pagination.css';

const Pagination = ({
  itemsCount,
  onPageSizeChange,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  if (itemsCount === 0) return null;
  return (
    <div className='paginate'>
      <span className='pagination-font'>
        Rows per page: &nbsp;{' '}
        <div className='ui inline dropdown visible active '>
          <div className='inline field'>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(e.target.value)}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='50'>50</option>
            </select>
            {/* </div> */}
          </div>
        </div>
      </span>
      <span className='ml-1 pagination-font'>
        {(currentPage - 1) * pageSize + 1}-
        {itemsCount < currentPage * pageSize
          ? itemsCount
          : currentPage * pageSize}{' '}
        of {itemsCount}
      </span>
      <span className='ml-1'>
        <button
          onClick={() => {
            if ((currentPage - 1) * pageSize > 0) onPageChange(-1);
          }}
          className=' ui circular icon button pagination-item pointer'
        >
          &lt;
        </button>
        <button
          onClick={() => {
            if (
              (currentPage - 1) * pageSize < itemsCount &&
              currentPage * pageSize < itemsCount
            )
              onPageChange(1);
          }}
          className=' ui circular icon button pagination-item pointer'
        >
          &gt;
        </button>
      </span>
    </div>
  );
};

export default Pagination;
