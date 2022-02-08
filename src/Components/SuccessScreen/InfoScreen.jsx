import React from 'react';
import PropTypes from 'prop-types';
import styles from './InfoScreen.module.scss';

import Button from '../Button/Button';

const InfoScreen = (
  {
    icon,
    text,
    clickCallback,
    buttonText,
  },
) => (
  <div className={styles.infoScreenWrapper}>
    <div>{icon}</div>
    <div>{text}</div>
    {clickCallback && (
    <Button
      disabled={false}
      onClick={clickCallback}
    >
      {buttonText}
    </Button>
    )}
  </div>
);

InfoScreen.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  clickCallback: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default React.memo(InfoScreen);
