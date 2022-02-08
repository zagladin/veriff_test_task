import React from 'react';
import renderer from 'react-test-renderer';
import CheckButton from './CheckButton';

const mockData = {
  onClick: () => {
  },
  text: 'Test for button',
  disabled: false,
  active: true,
};

it('renders correctly with one class', () => {
  const checkButton = renderer
      .create(
          <CheckButton
              onClick={mockData.onClick}
              text={mockData.text}
              disabled={mockData.disabled}
              active={mockData.active}/>,
      )
      .toJSON();
  expect(checkButton).toMatchSnapshot();
});

it('renders correctly with two classes', () => {
  const data = {...mockData, active: false};
  const checkButton = renderer
      .create(
          <CheckButton
              onClick={data.onClick}
              text={data.text}
              disabled={data.disabled}
              active={data.active}/>,
      )
      .toJSON();
  expect(checkButton).toMatchSnapshot();
});
