import { useContext } from 'react';
import { UserContext } from '../store/user-context';
import { Link, NavLink } from 'react-router-dom';
import logo from '../images/logo_duze_rcez.png';
import cx from 'classnames';

import '../css/Header.css';

function Header() {
  const { loggedIn, removeUserId } = useContext(UserContext);

  function logoutUser() {
    removeUserId();
  }
  return (
    <nav className='hamnav'>
      <div className='navTest'>
        <div className='logo_container'>
          <Link to='/'>
            <img className='logoimg' src={logo} alt='logo' />
          </Link>
        </div>

        <div>
          <label htmlFor='hamburger' className='hamburger'>
            &#9776;
          </label>
          <input type='checkbox' id='hamburger' />

          <div className='hamitems'>
            <NavLink
              to='/lista-uczestnikow'
              className={({ isActive }) => cx('hamitem', { 'navigation-active': isActive })}
            >
              Lista uczestnikow
            </NavLink>
            <NavLink
              to='/potwierdz-przybycie'
              className={({ isActive }) => cx('hamitem', { 'navigation-active': isActive })}
            >
              Potwierdź przybycie
            </NavLink>
            <NavLink
              to='/historie-absolwentow'
              className={({ isActive }) => cx('hamitem', { 'navigation-active': isActive })}
            >
              Historie absolwentow
            </NavLink>
            {loggedIn ? (
              <NavLink to='/' className='hamitem' onClick={logoutUser}>
                Wyloguj się
              </NavLink>
            ) : (
              <NavLink
                to='/logowanie'
                className={({ isActive }) => cx('hamitem', { 'navigation-active': isActive })}
              >
                Zaloguj się
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
