import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ thumbImageURL, largeImageURL, alt, openModal }) {
  return (
    <li
      className={css['ImageGalleryItem']}
      onClick={() => openModal(largeImageURL)}
    >
      <img
        src={thumbImageURL}
        alt={alt}
        className={css['ImageGalleryItem-image']}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  thumbImageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
