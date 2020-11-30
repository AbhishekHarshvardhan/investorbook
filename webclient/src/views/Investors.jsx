/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_INVESTORS } from '../services/investorService';
import Main from '../components/Main/Main';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';
import Form from '../components/Form';

const Investors = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const modalData = {
    title: 'Add Investor',
    subTitle: 'Please enter the details of the investment.',
    input: [
      { label: 'Enter Name', name: 'name' },
      { label: 'Enter Image Link', name: 'photo_large' },
    ],
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const data = {
    tabMenu: {
      title: 'Investors',
      btn: (
        <button className='item ui mini basic button prime' onClick={openModal}>
          Add Investor
        </button>
      ),
    },
    table: {
      columns: ['Name', 'Investments'],
      rows: [],
    },
  };

  const { loading, data: investorData } = useQuery(GET_INVESTORS);
  const merge = {};
  if (investorData)
    for (const inv of investorData.investment) {
      if (merge[inv.investor.id]) {
        merge[inv.investor.id].investments.push(inv.company.name);
      } else {
        merge[inv.investor.id] = {
          ...inv.investor,
          name: (
            <Link
              className='pointer'
              to={`/admin/investors/${inv.investor.id}`}
            >
              {inv.investor.name}
            </Link>
          ),
          photoURL: inv.investor.photo_thumbnail,
          investments: [],
        };
      }
    }

  if (loading) return <Loader />;
  if (investorData.investment.length === 0)
    return <p>The database is empty!</p>;
  data.table.rows = Object.values(merge).map((d) => ({
    ...d,
    investments: d.investments.join(', '),
  }));

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

export default Investors;
