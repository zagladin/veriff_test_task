import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = (
  {
    children,
    disabled,
    onClick,
    type,
  },
) => (
  <button
    className={styles.Button}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false,
  onClick: null,
  type: 'button',
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

export default React.memo(Button);
