import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import css from './Searchbar.module.css';

const Searchbar = forwardRef(
  ({ prevSearchQuery, setSearchQuery, setCurrentSearchPage }, ref) => {
    const formik = useFormik({
      initialValues: {
        searchQuery: '',
      },
      onSubmit: ({ searchQuery }) => {
        if (searchQuery !== prevSearchQuery) {
          setSearchQuery(searchQuery);
          setCurrentSearchPage(1);
        }
      },
    });

    return (
      <header className={css['Searchbar']} ref={ref}>
        <form className={css['SearchForm']} onSubmit={formik.handleSubmit}>
          <button type="submit" className={css['SearchForm-button']}>
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            onChange={formik.handleChange}
            value={formik.values.searchQuery}
          />
        </form>
      </header>
    );
  }
);

Searchbar.propTypes = {
  prevSearchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setCurrentSearchPage: PropTypes.func.isRequired,
};

export default Searchbar;
