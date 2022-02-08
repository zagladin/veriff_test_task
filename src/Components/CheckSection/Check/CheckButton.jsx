import React from 'react';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './CheckButton.module.scss';

const CheckButton = (
  {
    text,
    active,
    onClick,
    disabled,
  },
) => {
  const cx = className.bind(styles);

  const buttonStyles = cx({
    checkButton: true,
    inactive: !active,
  });

  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

CheckButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(CheckButton);
