import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { registerUser } from '../api/database';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Input from '../components/ui/Input';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import '../css/RegisterPage.css';
import { Validation } from '../components/validation/validation';

import logo from '../images/logo_duze_rcez.png';
import { UserContext } from '../store/user-context';
import Select from '../components/ui/Select';

const initialErrors = {
  emailError: '',
  passwordError: '',
  firstNameError: '',
  lastNameError: '',
};

function RegisterPage() {
  const navigate = useNavigate();
  const { loggedIn } = useContext(UserContext);

  const allYears = Array.from({length: 47}, (x, i) => i + 1975);
  const allSchools = ["Technikum", "Liceum ogólnokształcące", "Szkoła branżowa"];

  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    year: allYears[0],
    school: allSchools[0],
  });
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    if (loggedIn) {
      navigate('/', { replace: true });
    }
  }, [loggedIn, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {
      emailError: Validation.email(user.email),
      passwordError: Validation.password(user.password),
      firstNameError: Validation.firstName(user.firstName),
      lastNameError: Validation.lastName(user.lastName),
    };
    setErrors(newErrors);

    if (JSON.stringify(newErrors) !== JSON.stringify(initialErrors)) {
      setIsLoading(false);
      return;
    }

    console.log(user)
    const registered = await registerUser(user);
    setIsLoading(false);
    if (registered) {
      navigate('/logowanie');
    } else {
      setErrors(prev => ({ ...prev, emailError: 'Podany e-mail już istnieje' }));
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className='registerPage'>
      <div className='registerContainer'>
        <div className='header'>
          <Link to='/'>
            <img alt='logo' className='logo' src={logo} />
          </Link>
          <h1 className='headerTitle'>Rejestracja</h1>
        </div>
        <form onSubmit={onSubmit} className='registerInputContainer'>
          <Input
            type='email'
            placeholder='Adres e-mail'
            onChange={e => setUser({ ...user, email: e.target.value })}
            onBlur={() => {
              setErrors(prev => ({ ...prev, emailError: Validation.email(user.email) }));
            }}
            error={errors.emailError}
            value={user.email}
          />
          <Input
            type='password'
            placeholder='Hasło'
            onChange={e => setUser({ ...user, password: e.target.value })}
            onBlur={() => {
              setErrors(prev => ({ ...prev, passwordError: Validation.password(user.password) }));
            }}
            error={errors.passwordError}
            value={user.password}
          />
          <Input
            type='text'
            placeholder='Imię'
            onChange={e => setUser({ ...user, firstName: e.target.value })}
            onBlur={() => {
              setErrors(prev => ({
                ...prev,
                firstNameError: Validation.firstName(user.firstName),
              }));
            }}
            error={errors.firstNameError}
            maxLength={13}
            value={user.firstName}
          />
          <Input
            type='text'
            placeholder='Nazwisko'
            onChange={e => setUser({ ...user, lastName: e.target.value })}
            onBlur={() => {
              setErrors(prev => ({ ...prev, lastNameError: Validation.lastName(user.lastName) }));
            }}
            error={errors.lastNameError}
            maxLength={28}
            value={user.lastName}
          />
          <Select value={user.year} onChange={e => setUser({ ...user, year: e.target.value })}>
            {allYears.map(item => {
              return <option key={item}>{item}</option>
            })}
          </Select>
          <Select value={user.school} onChange={e => setUser({ ...user, school: e.target.value })}>
            {allSchools.map(item => {
              return <option key={item}>{item}</option>
            })}
          </Select>
          <div className='registerButton'>
            <button
              type='submit'
              className='submitButton'
              value='Zarejestruj się'
              onClick={onSubmit}
              disabled={isLoading}
            >Zarejestruj się</button>
            <NavLink to='/logowanie' className='backToLogin'>
              Mam już konto
            </NavLink>
        </div>
        </form>

      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;
