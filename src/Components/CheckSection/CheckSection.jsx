import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import styles from './CheckSection.module.scss';
import CheckButton from './Check/CheckButton';

const CheckSection = (
  {
    description,
    onClick,
    disabled,
  },
) => {
  const cx = className.bind(styles);

  const sectionStyles = cx({
    checkButtonWrapper: true,
    disabled,
  });

  const [selectedState, setSelectedState] = useState(null);

  const handleClick = useCallback((value) => {
    setSelectedState(value === 'Yes');
    onClick(value);
  }, [disabled, onClick]);

  const handleDigits = useCallback((event) => {
    if (event.key === '1') {
      handleClick('Yes');
    }
    if (event.key === '2') {
      handleClick('No');
    }
  }, [handleClick]);

  const handleArrows = useCallback((event) => {
    const nextElement = event.currentTarget?.nextSibling;
    const previousElement = event.currentTarget?.previousSibling;

    if (event.key === 'ArrowDown') {
      return nextElement && nextElement.focus();
    }
    if (event.key === 'ArrowUp') {
      return previousElement && previousElement.focus();
    }
    return null;
  }, []);

  const checkKeyDown = useCallback((event) => {
    if (disabled) {
      handleArrows(event);
      return null;
    }

    handleArrows(event);
    handleDigits(event);
  }, [disabled, handleArrows, handleDigits]);

  useEffect(() => setSelectedState(null), [disabled]);

  // the workaround to fill the unselected checks with nulls, to send all data,
  // but be able to distinguish between selected and unselected.
  // Probably we can do it in the upper scope
  useEffect(() => {
    if (disabled) {
      onClick(null);
    }
  }, []);

  return (
    <div
      className={sectionStyles}
      onKeyDown={checkKeyDown}
      tabIndex={0}
    >
      <div className={styles.description}>
        {description}
      </div>
      <div className={styles.buttons}>
        <CheckButton
          onClick={() => handleClick('Yes')}
          disabled={disabled}
          text="Yes"
          active={selectedState === true}
        />
        <CheckButton
          onClick={() => handleClick('No')}
          disabled={disabled}
          text="No"
          active={selectedState === false}
        />
      </div>
    </div>
  );
};

CheckSection.propTypes = {
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default React.memo(CheckSection);
