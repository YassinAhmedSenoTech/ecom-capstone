import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';

const renderRegister = () => {
  return render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
};

describe('Register Component - RTL & MSW Integration', () => {
  
  it('renders form elements correctly', () => {
    renderRegister();

    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('allows the user to type into input fields and submit form', async () => {
    const user = userEvent.setup();
    window.alert = jest.fn(); 

    renderRegister();

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitBtn = screen.getByRole('button', { name: /register/i });

    await user.type(nameInput, 'Yassin');
    await user.type(emailInput, 'yassin@example.com');
    await user.type(passwordInput, 'securepassword123');

    expect(nameInput).toHaveValue('Yassin');
    expect(emailInput).toHaveValue('yassin@example.com');
    expect(passwordInput).toHaveValue('securepassword123');

    await user.click(submitBtn);

    expect(window.alert).toHaveBeenCalledWith('Registered successfully');
  });

});