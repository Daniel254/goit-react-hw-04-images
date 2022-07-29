import PropTypes from 'prop-types';
import css from './Button.module.css';

function Button({ onClick, label }) {
  return (
    <button type="button" onClick={onClick} className={css['Button']}>
      {label}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;
