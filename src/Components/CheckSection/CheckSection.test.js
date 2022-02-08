import React from 'react';
import renderer from 'react-test-renderer';
import CheckSection from './CheckSection';

const mockData = {
  onClick: () => console.log('Click section'),
  description: 'Test check section',
  disabled: false,
};

it('should match the snapshot', () => {
  const checkSection = renderer
      .create(
          <CheckSection
              description={mockData.description}
              disabled={mockData.disabled}
              onClick={mockData.onClick} />
      )
      .toJSON();
  expect(checkSection).toMatchSnapshot();
});

