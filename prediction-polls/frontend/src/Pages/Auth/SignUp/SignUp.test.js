import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './index.jsx'; 


window.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  });


describe('SignUp Component', () => {
  it('renders the SignUp component', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

      expect(screen.getByText('or')).toBeInTheDocument();
      expect(screen.getByLabelText('EMAIL ADDRESS')).toBeInTheDocument();
      expect(screen.getByLabelText('USERNAME')).toBeInTheDocument();
      expect(screen.getByLabelText('PASSWORD')).toBeInTheDocument();
      expect(screen.getByLabelText('BIRTHDAY')).toBeInTheDocument();
      expect(screen.getByText('I Have an Account')).toBeInTheDocument();
    });

    test('handles form input changes', () => {
        render(
          <MemoryRouter> 
            <SignUp />
          </MemoryRouter>
        );
    
        const emailInput = screen.getByLabelText('EMAIL ADDRESS');
        const usernameInput = screen.getByLabelText('USERNAME');
        const passwordInput = screen.getByLabelText('PASSWORD');
        const birthdayInput = screen.getByLabelText('BIRTHDAY');
    
        // Simulate user input
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
        fireEvent.change(birthdayInput, { target: { value: '01/01/2000' } });
    
        // Verify that the inputs have the correct values
        expect(emailInput.value).toBe('test@example.com');
        expect(usernameInput.value).toBe('testUser');
        expect(passwordInput.value).toBe('testPassword');
        expect(birthdayInput.value).toBe('01/01/2000');
      });

      it('handles form submission', () => {
        const { getByText } = render(
            <MemoryRouter> 
              <SignUp />
            </MemoryRouter>
          );
    
        const signUpButton = getByText('Sign Up');
    
        // Simulate a form submission
        fireEvent.click(signUpButton);
      });

  
});