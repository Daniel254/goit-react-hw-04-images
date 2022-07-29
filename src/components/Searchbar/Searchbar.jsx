import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import css from './Searchbar.module.css';

const Searchbar = forwardRef(({ onSubmit }, ref) => {
  return (
    <header className={css['Searchbar']} ref={ref}>
      <form className={css['SearchForm']} onSubmit={onSubmit}>
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
        />
      </form>
    </header>
  );
});

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
