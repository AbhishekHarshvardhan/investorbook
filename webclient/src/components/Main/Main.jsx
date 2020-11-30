import React from 'react';
import Pagination from '../common/Pagination/Pagination';
import Table from '../common/DataTable/Table';
import './Main.css';
import MainNav from '../Navs/MainNav';
import { paginate } from '../../utils/paginate';

const Main = ({ data }) => {
  const [pageSize, setPageSize] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onPageChange = (newPage) => {
    setCurrentPage(currentPage + newPage);
  };

  const onPageSizeChange = (page) => {
    setPageSize(page);
  };

  const onQueryChange = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  const getPagedData = () => {
    let filtered = data.table.rows;
    if (searchQuery)
      filtered = data.table.rows.filter((m) =>
        m.investments.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const tableData = paginate(filtered, currentPage, pageSize);
    return { totalCount: filtered.length, tableData };
  };

  const { totalCount, tableData } = getPagedData();

  return (
    <div className='ui segment'>
      <MainNav data={data.tabMenu} onChange={onQueryChange} />
      <Table data={{ columns: data.table.columns, rows: tableData }} />
      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default Main;
