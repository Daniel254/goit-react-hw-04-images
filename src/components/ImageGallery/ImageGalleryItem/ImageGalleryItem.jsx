import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ webformatURL, largeImageURL, alt, openModal }) {
  return (
    <li className={css['ImageGalleryItem']}>
      <a href={largeImageURL} onClick={openModal}>
        <img
          src={webformatURL}
          alt={alt}
          className={css['ImageGalleryItem-image']}
        />
      </a>
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
