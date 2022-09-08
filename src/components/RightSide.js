import { useState, useContext, useEffect } from 'react';
import { Validation } from '../components/validation/validation';
import { Link } from 'react-router-dom';
import { loginUser } from '../api/database.js';
import { useNavigate } from 'react-router-dom';
import '../css/RightSide.css';
import Input from './ui/Input';
import logo from '../images/logo_duze_rcez.png';
import LoadingOverlay from './ui/LoadingOverlay';
import { UserContext } from '../store/user-context';
import Button from './ui/Button';

const initialErrors = {
  emailError: '',
  passwordError: '',
};

function RightSide() {
  const userContext = useContext(UserContext);
  const [modal, setModal] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(()=>{
  //   setModal(true)
  // })
  async function onSubmit(e) {
    e.preventDefault()
    setIsLoading(true);
    const newErrors = {
      emailError: Validation.email(user.email),
      passwordError: Validation.password(user.password),
    };
    setErrors(newErrors);

    if (JSON.stringify(newErrors) !== JSON.stringify(initialErrors)) {
      setIsLoading(false);
      return;
    }

    const { logged, id, accepted } = await loginUser(user);
    setIsLoading(false);
    if(!accepted){
      setModal(false)
      return<></>
    }
    if (logged) {
      userContext.addUserId(id);
      navigate('/');
    } else {
      setErrors(prev => ({ ...prev, emailError: 'Podane dane są nieprawidłowe' }));
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className='rightSide'>
      <div className='imgContainer'>
        <Link to='/'>
          <img className='img' src={logo} alt='logo' />
        </Link>
      </div>
      <div className='formContainer'>
        <h1 className='title'>Regionalne Centrum Edukacji Zawodowej</h1>
        <p className='subTitle'>Zaloguj się</p>
        {!modal?<div className='ModalBox'>
              <div className='ModalInnerBox'>
                <h3>Twoje konto jeszcze nie zostało zaakceptowane</h3>
                <p>Spróbuj później</p>
                <div className='ButtonModalConatainer'><Button onClick={()=>{setModal(true)}} color="green" value="OK"/></div>
                <p onClick={()=>{setModal(true)}} className='buttonCloseModal'>X</p>
              </div>
            </div>:null}
        <form>
          <div className='loginInputsWrapper'>
            <Input
              type='text'
              placeholder='E-mail'
              onChange={e => {
                setUser(prev => ({ ...prev, email: e.target.value }));
              }}
              onBlur={() => {
                setErrors(prev => ({ ...errors, emailError: Validation.email(user.email) }));
              }}
              error={errors.emailError}
              value={user.email}
            />
            <Input
              type='password'
              placeholder='Hasło'
              onChange={e => {
                setUser(prev => ({ ...user, password: e.target.value }));
              }}
              onBlur={() => {
                setErrors(prev => ({ ...prev, passwordError: Validation.password(user.password) }));
              }}
              error={errors.passwordError}
              
            />
            
          </div>
        
          <input type='submit' className='submitButton' value='Zaloguj się' onClick={onSubmit} />
          <div className='linkContainer'>
            <Link to='/rejestracja'>Nie posiadam konta</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RightSide;
