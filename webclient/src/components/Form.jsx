import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#yourAppElement');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    maxHeight: '250px',
  },
};

function Form({ modalIsOpen, openModal, closeModal, data }) {
  const afterOpenModal = () => {};

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='modal-title'>{data.title}</div>
        <div className='modal-subtitle'>{data.subTitle}</div>
        <form
          className='ui form form-modal'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {data.input.map((d) => (
            <div key={d.label} className='field'>
              <input
                onChange={() => {}}
                value={d.value}
                type='text'
                name={d.name}
                placeholder={d.label}
              />
            </div>
          ))}
          <div className='align-right'>
            <button onClick={closeModal} className='ui button' type='button'>
              Cancel
            </button>
            <button className='ui button modal-action' type='submit'>
              Add Company
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Form;
