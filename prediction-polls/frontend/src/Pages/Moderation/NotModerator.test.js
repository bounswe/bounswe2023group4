import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Moderation from './index.jsx';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'; 


describe('Moderation', () => {
    test('renders the non-moderator view correctly', () => {
        render(
            <MemoryRouter>
              <Moderation />
            </MemoryRouter>
          );
  
      
      expect(screen.getByText('Would you like to apply to become a moderator?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
    });
  
    test('handles the "apply to become a moderator" button click', async () => {
        render(
            <MemoryRouter>
              <Moderation />
            </MemoryRouter>
          );
  
      
      const mockApiCall = jest.fn(() => Promise.resolve());
  
      
      jest.spyOn(global, 'fetch').mockImplementation(mockApiCall);
  
      // Trigger the button click
      userEvent.click(screen.getByRole('button', { name: 'Apply' }));
  
      
      expect(mockApiCall).toHaveBeenCalledTimes(1);
  
      // Clean up the mock after the test
      global.fetch.mockRestore();
    });
  
  });

