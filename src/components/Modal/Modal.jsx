import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ largeImageURL, alt, closeModal }) {
  useEffect(() => {
    window.addEventListener('keyup', closeModal);

    return () => {
      window.removeEventListener('keyup', closeModal);
    };
  }, [closeModal]);

  return createPortal(
    <div onClick={closeModal} className={css['Overlay']}>
      <div className={css['Modal']}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
