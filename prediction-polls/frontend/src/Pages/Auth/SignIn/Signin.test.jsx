import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignIn from './index.jsx'; 


window.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  });


describe('Sign in Component', () => {
  it('renders the Signin component', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

      expect(screen.getByPlaceholderText('example@outlook.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    });

    test('handles form input changes', () => {
        render(
          <MemoryRouter> 
            <SignIn />
          </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText('example@outlook.com');
        const passwordInput = screen.getByPlaceholderText('password');

        // Simulate user input
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

        // Verify that the inputs have the correct values
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('testPassword');
      });

      it('handles form submission', () => {
        const { getByText } = render(
            <MemoryRouter> 
              <SignIn />
            </MemoryRouter>
          );

        const signInButton = getByText('LOG IN');

        // Simulate a form submission
        fireEvent.click(signInButton);
      });


});