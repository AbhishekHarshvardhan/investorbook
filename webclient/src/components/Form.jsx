import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal-root');

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

function Form({ children, modalIsOpen, closeModal, data }) {
  const afterOpenModal = () => {};

  return children ? (
    <Modal
      isOpen={modalIsOpen}
      closeModal={closeModal}
      style={customStyles}
      children={children}
    />
  ) : (
    <Modal isOpen={modalIsOpen} style={customStyles}>
      <div className='modal-title'>{data.title}</div>
      <div className='modal-subtitle'>{data.subTitle}</div>
      <form className='ui form form-modal' onSubmit={closeModal}>
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
            {data.title}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default Form;
