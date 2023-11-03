import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

/*=============================================== Test case 1: Testing the render of the tasks list ======================================*/

test('renders the task list', () => {
  render(<App />);
  const taskElement = screen.getByText(/Task 1/i);
  expect(taskElement).toBeInTheDocument();
});

/*=============================================== Test case 2: Testing if the pagination of the tasks list works correctly ======================================*/

test('paginates tasks correctly', () => {
  render(<App />);

  // Click on the "2" button to navigate to the second page
  const page2Button = screen.getByText('2');
  fireEvent.click(page2Button);

  // Verify that the second page is active
  expect(page2Button).toHaveClass('active');
});
