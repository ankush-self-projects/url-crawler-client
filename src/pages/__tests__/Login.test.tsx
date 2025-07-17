import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { AuthProvider } from '../../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { token: 'fake-jwt' } })),
}));

describe('Login page', () => {
  it('renders login form and submits with valid credentials', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // You would mock navigation or check for a success message/snackbar
    expect(await screen.findByText(/dashboard|success|logout/i)).toBeInTheDocument();
  });
}); 