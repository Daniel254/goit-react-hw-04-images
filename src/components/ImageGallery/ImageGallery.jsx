import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css['ImageGallery']}>
      {images.map(({ id, thumbImageURL, largeImageURL, alt }) => (
        <ImageGalleryItem
          key={id}
          thumbImageURL={thumbImageURL}
          largeImageURL={largeImageURL}
          alt={alt}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = { images: PropTypes.array };

export default ImageGallery;
