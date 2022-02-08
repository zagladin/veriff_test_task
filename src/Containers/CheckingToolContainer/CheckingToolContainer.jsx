import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchChecks, submitCheckResults } from '../../API/Api';
import CheckingTool from '../../Components/CheckingTool/CheckingTool';

const CheckingToolContainer = () => {
  // It is a wrapper to isolate fetch logic and render logic.
  // In the container I prefer to write something about fetch,
  // operation the state, actions, dispatches

  const [checksAreLoading, setChecksAreLoading] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const [checklist, setChecklist] = useState(null);

  const [success, setSuccess] = useState(false);

  // usually, I encapsulate fetch logic into a custom hook
  // to use specific fetch methods in different places
  // It can increase the number of re-renders, but this
  // approach is clearer

  const handleSubmit = useCallback((results) => {
    setSubmitting(true);
    submitCheckResults(results)
      .then(() => {
        setSuccess(true);
        toast.success('The form has been submitted');
      })
      .catch(
        () => toast.error('Could not submit the checklist. Please, try again.'),
      )
      .finally(() => setSubmitting(false));
  }, []);

  const getChecks = () => {
    setChecksAreLoading(true);
    fetchChecks()
      .then((res) => setChecklist(res))
      .catch(() => toast.error(
        'Could not load the checklist. Please, refresh the page',
      ))
      .finally(() => setChecksAreLoading(false));
  };

  useEffect(() => getChecks(), []);

  return (
    <CheckingTool
      checkList={checklist}
      submitForm={handleSubmit}
      successForm={success}
      submittingForm={submitting}
      isLoading={checksAreLoading}
      requestAgain={getChecks}
    />
  );
};

export default CheckingToolContainer;
