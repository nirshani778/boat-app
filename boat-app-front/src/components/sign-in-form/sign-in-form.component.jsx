import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInWithBoatAppBack } from '../../utils/boat-app-back/boat-app-back';
import Button from '../button/button.component';
import { setCurrentUser } from '../../store/user/user.action';
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};
const defaultUserResult = {
  data: '',
  success: '',
  message: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [userResult, setUserResult] = useState(defaultUserResult);
  const { message } = userResult;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await signInWithBoatAppBack(email, password);
      await setUserResult(user);

      dispatch(setCurrentUser(user));
      resetFormFields();
      navigate('/');
    } catch (error) {
      console.log('user login encountered an error', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
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
          <Button type="submit" name="Sign In" />
        </form>
      </div>
      <h4>{message}</h4>
    </div>
  );
};

export default SignInForm;
