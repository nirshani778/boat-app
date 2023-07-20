import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as BoatLogo } from '../../assets/boat.svg';
import { setCurrentUser } from '../../store/user/user.action';
import './navigation.styles.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const signOutHandler = async () => {
    dispatch(setCurrentUser(null));
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <BoatLogo className="logo" />
          <h1 className="app-logo-title">Boat App</h1>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/authentication">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
