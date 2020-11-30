import React from 'react';
import './Table.css';

const Table = ({ data }) => {
  return (
    <table className='ui very basic stackable table tab-table'>
      <thead>
        <tr>
          {data.columns.map((c, i) => (
            <th
              key={c}
              className={`text-light ${i === 0 ? ' three wide' : ''}`}
            >
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.length === 0 && (
          <tr>
            <td className='text-title' colspan='2'>
              No record found
            </td>
          </tr>
        )}

        {data.rows.map((r, i) => (
          <tr key={r.id}>
            <td>
              <h4 className='ui image header'>
                {r.photoURL && (
                  <img
                    alt='img'
                    src={r.photoURL}
                    className='ui circular image'
                  />
                )}
                <div className='content text-title'>{r.name}</div>
              </h4>
            </td>
            <td className='text-light'>{r.investments}</td>
            {r.actions && <td className='text-light'>{r.actions}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
