import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ onClick, children }) {
  return (
    <button type="button" onClick={onClick} className={css['Button']}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
