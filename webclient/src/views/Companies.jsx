/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMPANIES } from '../services/companyService';
import Main from '../components/Main/Main';
import Loader from '../components/common/Loader';
import Form from '../components/Form';

const Companies = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const modalData = {
    title: 'Add Company',
    subTitle: 'Please enter the details of the investment.',
    input: [{ label: 'Enter Name', name: 'name' }],
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const data = {
    tabMenu: {
      title: 'Companies',
      btn: (
        <a className='item ui mini basic button prime' onClick={openModal}>
          Add Company
        </a>
      ),
    },
    table: {
      columns: ['Name', 'Investors'],
      rows: [],
    },
  };

  const { loading, data: investorData } = useQuery(GET_COMPANIES);
  const merge = {};
  if (investorData)
    for (const inv of investorData.investment) {
      if (merge[inv.company.id]) {
        merge[inv.company.id].investments.push(inv.investor.name);
      } else {
        merge[inv.company.id] = {
          ...inv.company,
          investments: [],
        };
      }
    }

  if (loading) return <Loader />;
  if (investorData.investment.length === 0)
    return <p>The database is empty!</p>;

  data.table.rows = Object.values(merge)
    .map((d) => ({
      ...d,
      investments: d.investments.join(', '),
    }))
    .filter((d) => d.investments.length);

  return (
    <>
      <Main data={data} />
      <Form
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        data={modalData}
      />
    </>
  );
};

export default Companies;
