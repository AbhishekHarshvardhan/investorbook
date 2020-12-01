import React from 'react';
import Table from '../components/common/DataTable/Table';
import { useQuery } from '@apollo/client';
import { GET_INVESTMENT } from '../services/investmentService';
import Loader from '../components/common/Loader';
import Form from '../components/Form';
import Pagination from '../components/common/Pagination/Pagination';
import { paginate } from '../utils/paginate';
import EditInvestor from '../components/Investors/EditInvestor';
import DeleteInvestor from '../components/Investors/DeleteInvestor';

const data = {
  tabMenu: { title: 'Investors', btnText: 'Add Investor' },
  table: {
    columns: [
      'Name',
      'Investments',
      <div className='md-text-right md-mr-1'>Actions</div>,
    ],
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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalChild, setModalChild] = React.useState();

  const paths = window.location.pathname.split('/');
  const investorId = paths[paths.length - 1];
  const { loading, data: investorData } = useQuery(GET_INVESTMENT(investorId));

  const onPageChange = (newPage) => {
    setCurrentPage(currentPage + newPage);
  };

  const onPageSizeChange = (page) => {
    setPageSize(page);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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

  if (loading) return <Loader />;
  if (!investorData || investorData.investment.length === 0)
    return <p className='tab-title'>No record</p>;

  data.table.rows = investorData.investment.map((d) => ({
    name: d.company.name,
    id: d.company.id,
    investments: '$' + d.amount,
    actions: (
      <div className='right menu text-right sm-text-left'>
        <a onClick={() => openModal(d)} className='circular ui icon button'>
          <i className='pencil icon ' />
        </a>
        <a className='circular ui icon button'>
          <i className='trash alternate icon' />
        </a>
      </div>
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
      <div className='ui secondary stackable menu'>
        <div className='item'>
          <h2 className='ui header'>
            <span
              onClick={() => window.history.back()}
              style={{ margin: '1rem', fontWeight: 100 }}
              className='pointer back-btn'
            >
              &lt;
            </span>
            <img
              alt={investorData.investment[0].investor.name}
              className='ui avatar image'
              src={investorData.investment[0].investor.photo_large}
            />
            <div className='content sm-pl-0'>
              {investorData.investment[0].investor.name}
              <div className='sub header'>
                Total Amount Invested: $
                {investorData.investment_aggregate.aggregate.sum.amount}
              </div>
            </div>
          </h2>
        </div>
        <div className='right menu stackable'>
          <a
            onClick={() => {
              setModalChild(
                <EditInvestor
                  closeModal={closeModal}
                  investor={investorData.investment[0].investor}
                  setModalChild={setModalChild}
                />
              );

              openModal({});
            }}
            className='item actions'
          >
            <i className='pencil icon' />
            EDIT NAME
          </a>
          <a
            onClick={() => {
              setModalChild(
                <DeleteInvestor
                  closeModal={closeModal}
                  investor={investorData.investment[0].investor}
                  setModalChild={setModalChild}
                />
              );
              openModal({});
            }}
            className='item actions'
          >
            <i className='trash alternate icon' />
            REMOVE INVESTOR
          </a>
        </div>
      </div>
      <div className='investor-data'>
        <div className='ui secondary  menu'>
          <div className='item tab-title'>Investments</div>
          <a onClick={openModal} className='item ui small basic button'>
            + Add Investment
          </a>
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
        >
          {modalChild}
        </Form>
      )}
    </div>
  );
};

export default InvestorDetails;
