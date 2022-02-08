import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CheckingTool.module.scss';

import Button from '../Button/Button';
import CheckSection from '../CheckSection/CheckSection';
import Loader from '../Loader/Loader';
import InfoScreen from '../SuccessScreen/InfoScreen';

const CheckingTool = (
  {
    submitForm,
    checkList,
    successForm,
    submittingForm,
    isLoading,
    requestAgain,
  },
) => {
  const [checklist, setChecklist] = useState(null);
  const [disabledIndex, setDisabledIndex] = useState(0);
  const [bufferArray, setBufferArray] = useState([]);
  const [results, setResults] = useState([]);

  const checkForm = useCallback(
    () => results.some((result) => result.value === 'No')
          || (results.length === checklist?.length
              && results.every((item) => item.value === 'Yes')),
    [checklist?.length, results],
  );

  const handleClick = useCallback((value, id, index) => {
    // The logic for disabling the next row,
    // if previous was selected as 'No

    if (value === 'No') {
      setDisabledIndex(index);
    } else if (value === 'Yes') {
      setDisabledIndex(index + 1);
    }

    setBufferArray((prevState) => [
      ...prevState, {
        id,
        value,
      }]);
  }, []);

  const renderCheckButtons = useCallback(
    () => {
      // Sort checklist by priority from the less digit (3) to high (10)
      const sortedChecklist = checklist && Object.values(checklist)
        .sort((a, b) => a.priority - b.priority);

      return sortedChecklist.map((check, index) => (
        <React.Fragment key={check.id}>
          <CheckSection
            description={check.description}
            onClick={(val) => handleClick(val, check.id, index)}
            disabled={index > disabledIndex}
          />
        </React.Fragment>
      ));
    }, [checklist, disabledIndex, handleClick],
  );

  useEffect(() => setChecklist(checkList), [checkList]);
  useEffect(() => setResults([
    ...new Map(bufferArray?.map((item) => [item.id, item])).values()]),
  [bufferArray]);

  const handleReload = () => window.location.reload();

  const renderCheckListComponent = useCallback(() => {
    const handleSubmit = () => submitForm(results);

    if (checklist) {
      return (
        <>
          {renderCheckButtons()}
          <Button
            disabled={!checkForm()}
            onClick={handleSubmit}
          >
            {submittingForm ? 'Submitting...' : 'Submit'}
          </Button>
        </>
      );
    }
    // Of course, we can cheat with 'requestAgain' and just refresh the page
    // but would be better to literally request API once more,
    // to avoid the reloading

    return (
      <InfoScreen
        text="Can not get checklist"
        clickCallback={requestAgain}
        icon="😥"
        buttonText="Refresh"
      />
    );
  }, [
    checkForm,
    checklist,
    renderCheckButtons,
    requestAgain,
    results,
    submitForm,
    submittingForm,
  ]);

  const renderComponent = useCallback(() => {
    if (successForm) {
      return (
        <InfoScreen
          text="Application completed"
          clickCallback={handleReload}
          icon="✔"
          buttonText="Return"
        />
      );
    }
    return (
      <>
        {isLoading
          ? <Loader />
          : renderCheckListComponent()}
      </>
    );
  }, [isLoading, renderCheckListComponent, successForm]);

  return (
    <div className={styles.checkingToolContainer}>
      {renderComponent()}
    </div>
  );
};
// When some types are repeating I try to isolate it in the 'interface' object
// to use in different places, e.g
//    const checkInterface = {
//         description: PropTypes.string,
//         id: PropTypes.string,
//         priority: PropTypes.number,
//    };
// and then we can use it like
// PropTypes.shape(checkInterface)

CheckingTool.defaultProps = {
  isLoading: false,
  checkList: [],
};

CheckingTool.propTypes = {
  submitForm: PropTypes.func.isRequired,
  checkList: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    priority: PropTypes.number,
  })),
  successForm: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired,
  requestAgain: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default React.memo(CheckingTool);
