import React from 'react';

const DeleteInvestor = ({ closeModal, investor, setModalChild }) => {
  return (
    <form className='ui form form-modal' onSubmit={closeModal}>
      <h4>
        Do you want to delete{' '}
        <span className='text-light'>{investor.name}</span> ?
      </h4>
      <br />
      <div className='align-right'>
        <button
          onClick={() => {
            setModalChild(null);
            closeModal();
          }}
          className='ui button'
          type='button'
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setModalChild(null);
            closeModal();
          }}
          className='ui button modal-action'
          type='submit'
        >
          Yes
        </button>
      </div>
    </form>
  );
};

export default DeleteInvestor;
