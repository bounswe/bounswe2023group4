import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // adjust the import path as needed

// Mock child component
const MockChildComponent = () => <div>Protected Content</div>;

test("redirects to sign-in page if not authenticated", async () => {
  // Remove token to simulate unauthenticated user
  localStorage.removeItem('accessToken'); 

  render(
    <Router>
      <PrivateRoute>
        <MockChildComponent />
      </PrivateRoute>
    </Router>
  );

  // Wait for any asynchronous operations in the component
  await waitFor(() => {
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });
});
test("renders child component if authenticated", async () => {
  // Set a mock token to simulate authenticated user
  localStorage.setItem('accessToken', 'mock-token');

  render(
    <Router>
      <PrivateRoute>
        <MockChildComponent />
      </PrivateRoute>
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  // Cleanup: remove the mock token
  localStorage.removeItem('accessToken');
});
