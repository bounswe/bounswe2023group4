import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PollOption from './index'; 

test('renders PollOption component and checks interactions', () => {
  const mockOption = { title: 'Option 1', votes: 10 };
  const widthPercentage = 50;

  render(
    <MemoryRouter>
      <PollOption widthPercentage={widthPercentage} option={mockOption} />
    </MemoryRouter>
  );

  expect(screen.getByText('Option 1')).toBeInTheDocument();
  expect(screen.getByText('10')).toBeInTheDocument();
});
