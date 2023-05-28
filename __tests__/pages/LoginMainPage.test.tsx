import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import LoginMainPage from '../../src/pages/login/LoginMainPage';

describe('LoginMainPage', () => {
  it('should render the welcome text', () => {
    const {getByText} = render(<LoginMainPage />);
    const welcomeText = getByText('Hello!');
    expect(welcomeText).toBeTruthy();
  });

  it('should update username input value', () => {
    const {getByPlaceholderText} = render(<LoginMainPage />);
    const usernameInput = getByPlaceholderText('Enter username here...');
    fireEvent.changeText(usernameInput, 'testuser');
    expect(usernameInput.props.value).toBe('testuser');
  });

  it('should update password input value', () => {
    const {getByPlaceholderText} = render(<LoginMainPage />);
    const passwordInput = getByPlaceholderText('Enter password here...');
    fireEvent.changeText(passwordInput, 'testpassword');
    expect(passwordInput.props.value).toBe('testpassword');
  });

  it('should navigate to LoginRegister page when registration link is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(<LoginMainPage navigation={navigationMock} />);
    const registrationLink = getByText('Not registered yet? Click here');
    fireEvent.press(registrationLink);
    expect(navigationMock.navigate).toHaveBeenCalledWith('LoginRegister');
  });
});
