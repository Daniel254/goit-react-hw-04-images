import pixabayApi from 'api/pixabay';
import Button from 'components/Button/Button';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import { Status } from 'constants/status';
import { useEffect, useRef, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import css from './App.module.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [modalImageURL, setModalImageURL] = useState(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const searchBarRef = useRef();

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setStatus(Status.PENDING);
    pixabayApi(searchQuery, searchPage)
      .then(result => {
        if (searchPage === 1) {
          setImages([...result.hits]);
          setScrollOffset(0);
        } else {
          setImages(prev => [...prev, ...result.hits]);
          setScrollOffset(
            document.body.scrollHeight - searchBarRef.current.offsetHeight * 2
          );
        }
        console.log(result);
        setTotalImages(result.totalHits);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        setImages([]);
        setError(error);
      });
  }, [searchQuery, searchPage]);

  useEffect(() => {
    if (status === Status.RESOLVED) {
      window.scroll({
        top: scrollOffset,
        behavior: 'smooth',
      });
    }
  }, [scrollOffset, status]);

  const submitHandler = e => {
    e.preventDefault();
    const newSearchQuery = e.currentTarget.elements.searchQuery.value;
    if (newSearchQuery !== searchQuery) {
      setSearchQuery(newSearchQuery);
      setSearchPage(1);
    }
  };

  const showLoadMoreButton = images.length > 0 && images.length < totalImages;

  return (
    <div className={css['App']}>
      <Searchbar onSubmit={submitHandler} ref={searchBarRef} />
      <ImageGallery
        images={images}
        openModal={largeImageURL => setModalImageURL(largeImageURL)}
      />

      {status === Status.PENDING && (
        <Oval
          color="#00BFFF"
          height={40}
          width={40}
          wrapperStyle={{ justifyContent: 'center' }}
        />
      )}

      {status === Status.RESOLVED && showLoadMoreButton && (
        <Button
          onClick={() => setSearchPage(prev => ++prev)}
          label="Load more"
        />
      )}

      {status === Status.REJECTED && (
        <h1 style={{ textAlign: 'center' }}>{error.message}</h1>
      )}

      {modalImageURL && (
        <Modal
          largeImageURL={modalImageURL}
          closeModal={() => setModalImageURL(null)}
          alt="image"
        />
      )}
    </div>
  );
}
