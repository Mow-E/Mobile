import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import RegistrationPage from '../../src/pages/login/RegistrationPage';

describe('RegistrationPage', () => {
  it('should render the welcome text', () => {
    const {getByText} = render(<RegistrationPage />);
    const welcomeText = getByText('Welcome!');
    expect(welcomeText).toBeTruthy();
  });

  it('should update username input value', () => {
    const {getByPlaceholderText} = render(<RegistrationPage />);
    const usernameInput = getByPlaceholderText('Enter username here...');
    fireEvent.changeText(usernameInput, 'testuser');
    expect(usernameInput.props.value).toBe('testuser');
  });

  it('should update password input value', () => {
    const {getByPlaceholderText} = render(<RegistrationPage />);
    const passwordInput = getByPlaceholderText('Enter password here...');
    fireEvent.changeText(passwordInput, 'testpassword');
    expect(passwordInput.props.value).toBe('testpassword');
  });

  it('should update confirm password input value', () => {
    const {getByPlaceholderText} = render(<RegistrationPage />);
    const confirmPasswordInput = getByPlaceholderText(
      'Enter password here again...',
    );
    fireEvent.changeText(confirmPasswordInput, 'testpassword');
    expect(confirmPasswordInput.props.value).toBe('testpassword');
  });
});
