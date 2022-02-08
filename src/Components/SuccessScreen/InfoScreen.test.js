import React from 'react';
import renderer from 'react-test-renderer';
import InfoScreen from './InfoScreen';

const mockData = {
  clickCallback: () => console.log('Click'),
  text: 'Info screen text',
  icon: '💀',
  buttonText: 'Click me',
};

it('should match the snapshot', () => {
  const checkSection = renderer
      .create(
          <InfoScreen
              text={mockData.text}
              buttonText={mockData.buttonText}
              icon={mockData.icon}
              clickCallback={mockData.clickCallback}/>,
      )
      .toJSON();
  expect(checkSection).toMatchSnapshot();
});

