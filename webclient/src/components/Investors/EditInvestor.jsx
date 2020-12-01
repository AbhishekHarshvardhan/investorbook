import React from 'react';

const EditInvestor = ({ closeModal, investor, setModalChild }) => {
  return (
    <form className='ui form form-modal' onSubmit={closeModal}>
      <div className='field'>
        <input
          onChange={() => {}}
          value={investor.name}
          type='text'
          name='name'
          placeholder='Enter Name'
        />
      </div>
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
          Update
        </button>
      </div>
    </form>
  );
};

export default EditInvestor;
