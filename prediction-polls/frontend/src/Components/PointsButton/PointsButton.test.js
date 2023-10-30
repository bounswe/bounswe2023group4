import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PointsButton from './index';

describe('PointsButton', () => {
  const mockPoints = [
    { GP: 50 },
    { XP: 20 },
    { SP: 10 }
  ];

  test('renders the PointsButton component', () => {
    render(<PointsButton points={mockPoints} />);
    expect(screen.getByText('50 GP')).toBeInTheDocument();
  });

  test('toggles dropdown on button click', () => {
    render(<PointsButton points={mockPoints} />);
    const button = screen.getByRole('button', { name: /50 GP/i });
    
    // Check that the dropdown is not visible initially
    expect(screen.queryByText('XP: 20')).not.toBeInTheDocument();

    // Click the button to open the dropdown
    fireEvent.click(button);
    expect(screen.getByText('XP: 20')).toBeInTheDocument();
    expect(screen.getByText('SP: 10')).toBeInTheDocument();

    // Click the button again to close the dropdown
    fireEvent.click(button);
    expect(screen.queryByText('XP: 20')).not.toBeInTheDocument();
  });
});
