import { useState } from 'react';
import { signUpWithBoatAppBack } from '../../utils/boat-app-back/boat-app-back';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';
const defaultFormFields = {
  email: '',
  password: '',
  confirmPassword: '',
};
const defaultUserResult = {
  data: '',
  success: '',
  message: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, confirmPassword } = formFields;
  const [userResult, setUserResult] = useState(defaultUserResult);
  const { message } = userResult;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const result = await signUpWithBoatAppBack(email, password);
      await setUserResult(result);

      resetFormFields();
    } catch (error) {
      if (error.code === 400) {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              label="Email"
              type="email"
              required
              onChange={handleChange}
              name="email"
              value={email}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              label="Password"
              type="password"
              required
              onChange={handleChange}
              name="password"
              value={password}
            />
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input
              label="Confirm Password"
              type="password"
              required
              onChange={handleChange}
              name="confirmPassword"
              value={confirmPassword}
            />
          </div>
          <Button type="submit" name="Sign Up" />
        </form>
      </div>
      <h4>{message}</h4>
    </div>
  );
};

export default SignUpForm;
