import React from 'react';
import Table from '../components/common/DataTable/Table';
import { useQuery } from '@apollo/client';
import { GET_INVESTMENT } from '../services/investmentService';
import Loader from '../components/common/Loader';
import Form from '../components/Form';
import Pagination from '../components/common/Pagination/Pagination';
import { paginate } from '../utils/paginate';

const data = {
  tabMenu: { title: 'Investors', btnText: 'Add Investor' },
  table: {
    columns: ['Name', 'Investments', <div className='text-right'>Actions</div>],
    rows: [],
  },
};

const modalData = {
  title: 'Add Investment',
  subTitle: 'Please enter the details of the investment.',
  input: [
    { label: 'Select Company', name: 'company' },
    { label: 'Investment Amount', name: 'amount' },
  ],
};

const InvestorDetails = () => {
  const [pageSize, setPageSize] = React.useState(5);

  const [currentPage, setCurrentPage] = React.useState(1);

  const onPageChange = (newPage) => {
    setCurrentPage(currentPage + newPage);
  };

  const onPageSizeChange = (page) => {
    setPageSize(page);
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = (d) => {
    if (d.company) {
      modalData.input[0].value = d.company.name;
      modalData.input[1].value = d.amount;
    } else {
      delete modalData.input[0].value;
      delete modalData.input[1].value;
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const paths = window.location.pathname.split('/');
  const investorId = paths[paths.length - 1];
  const { loading, data: investorData } = useQuery(GET_INVESTMENT(investorId));

  if (loading) return <Loader />;
  if (!investorData || investorData.investment.length === 0)
    return <p>No record</p>;

  data.table.rows = investorData.investment.map((d) => ({
    name: d.company.name,
    id: d.company.id,
    investments: '$' + d.amount,
    actions: (
      <>
        <div className='right menu text-right'>
          <button
            onClick={() => openModal(d)}
            className='circular ui icon button'
          >
            <i className='pencil icon ' />
          </button>
          <button
            className='circular ui icon button'
            style={{ marginLeft: '1rem' }}
          >
            <i className='trash alternate icon' />
          </button>
        </div>
      </>
    ),
  }));

  const getPagedData = () => {
    let filtered = data.table.rows;
    const tableData = paginate(filtered, currentPage, pageSize);
    return { totalCount: filtered.length, tableData };
  };

  const { totalCount, tableData } = getPagedData();

  return (
    <div className='form'>
      <div className='ui secondary menu'>
        <div className='item'>
          <h2 className='ui header'>
            <span
              onClick={() => window.history.back()}
              style={{ margin: '1rem', fontWeight: 100 }}
              className='pointer'
            >
              &lt;
            </span>
            <img
              alt={investorData.investment[0].investor.name}
              className='ui avatar image'
              src={investorData.investment[0].investor.photo_large}
            />
            <div className='content'>
              {investorData.investment[0].investor.name}
              <div className='sub header'>
                Total Amount Invested: $
                {investorData.investment_aggregate.aggregate.sum.amount}
              </div>
            </div>
          </h2>
        </div>

        <div className='right menu'>
          <button className='item actions'>
            <i className='pencil icon' />
            EDIT NAME
          </button>
          <button className='item actions'>
            <i className='trash alternate icon' />
            REMOVE INVESTOR
          </button>
        </div>
      </div>

      <div className='investor-data' style={{ marginLeft: '7.5rem' }}>
        <div className='ui secondary menu'>
          <div className='item tab-title'>Investments</div>
          <button onClick={openModal} className='item ui small basic button'>
            + Add Investment
          </button>
        </div>
        <div className='investor-table' style={{ margin: '2.5rem' }}>
          <Table data={{ columns: data.table.columns, rows: tableData }} />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </div>
      {modalIsOpen && (
        <Form
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          data={modalData}
        />
      )}
    </div>
  );
};

export default InvestorDetails;
