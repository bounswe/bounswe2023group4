import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Create from './index.jsx'; 
import { MemoryRouter } from 'react-router-dom';

describe('Create', () => {
  test('renders Create component', () => {
    render(
        <MemoryRouter>
          <Create />
        </MemoryRouter>
      );
  });

  test('allows the user to fill the question input', () => {
    const { getByLabelText } = render(
        <MemoryRouter>
          <Create />
        </MemoryRouter>
      );
    const input = getByLabelText('Enter the question title');
    fireEvent.change(input, { target: { value: 'Test Question' } });
    expect(input.value).toBe('Test Question');
  });

  test('allows the user to select multiple choice as poll type', () => {
    const { getByText } = render(
        <MemoryRouter>
          <Create />
        </MemoryRouter>
      );
    const button = getByText('Multiple Choice');
    fireEvent.click(button);
    expect(button).toHaveStyle({ backgroundColor: 'var(--secondary-500)' }); 
  });

  test('allows the user to select customized as poll type', () => {
    const { getByText } = render(
        <MemoryRouter>
          <Create />
        </MemoryRouter>
      );
    const button = getByText('Customized');
    fireEvent.click(button);
    expect(button).toHaveStyle({ backgroundColor: 'var(--secondary-500)' }); 
  });

  test('allows the user to select date when customized is selected', () => { 
    const { getByText } = render(
        <MemoryRouter>
          <Create />
        </MemoryRouter>
      );
    const button = getByText('Customized');
    fireEvent.click(button);
    const addButton = getByText('Date'); 
    fireEvent.click(addButton);
    expect(addButton).toHaveStyle({ backgroundColor: 'var(--secondary-500)' });  
  });

  test('allows the user to select numeric when customized is selected', () => { 
    const { getByText } = render(
        <MemoryRouter>
          <Create />
        </MemoryRouter>
      );
    const button = getByText('Customized');
    fireEvent.click(button);
    const addButton = getByText('Numeric'); 
    fireEvent.click(addButton);
    expect(addButton).toHaveStyle({ backgroundColor: 'var(--secondary-500)' });  
  });

  test('allows the user to set a due date', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );
    const checkbox = getByLabelText('Set Due Date');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('allows the user to add a choice when multiple choice is selected', () => {
    const { getByText } = render(
        <MemoryRouter>
          <Create />
        </MemoryRouter>
      );
    const button = getByText('Multiple Choice');
    fireEvent.click(button);
    const addButton = getByText('+ Add');
    fireEvent.click(addButton);
    const choiceInput = document.querySelector('.ant-input');
    expect(choiceInput).toBeInTheDocument();
  });

  test('allows the user to open distribution visibility', () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );
    const button = getByText('Multiple Choice');
    fireEvent.click(button);
    const checkbox = getByLabelText('Open Distribution Visibility');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('allows the user to submit poll', () => {
    const { getByText } = render(
        <MemoryRouter>
          <Create />
        </MemoryRouter>
      );
    const button = getByText('Create Poll');
    fireEvent.click(button);
    expect(button).toHaveStyle({ backgroundColor: 'var(--secondary-500)' }); 
  });
});