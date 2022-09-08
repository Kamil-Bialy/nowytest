import { useState, useContext } from 'react';
import Header from '../components/Header';
import Button from '../components/ui/Button';
import '../css/BookingArivePage.css';
import { UserContext } from '../store/user-context';
import { Link } from 'react-router-dom';
import { bookingArrival } from '../api/database';

function BookingArivePage() {
  const { userId, loggedIn } = useContext(UserContext);
  const [checked, setchecked] = useState({
    userId: userId,
    arrival: false,
    dinner: false,
  });
  function onSubmit() {
    setchecked({ ...checked, arrival: true });
    console.log(checked);
    bookingArrival(checked);
  }

  function NotLoggedIn() {
    return (
      <div className='BookingMain'>
        <div className='BookingTitleContainer'>
          <h1 className='BookingTitle'>Potwierdź przybycie</h1>
        </div>
        <div className='BookingSubtitleContainer'>
          <p className='BookingSubtitle'>Aby potwierdzić przybycie musisz się zalogować</p>
        </div>
        <Link to='/logowanie'>
          <Button color='blue' value='Zaloguj się' />
        </Link>
      </div>
    );
  }
  function LoggedIn() {
    return (
      <div className='BookingMain'>
        <div className='BookingTitleContainer'>
          <h1 className='BookingTitle'>Potwierdź przybycie</h1>
        </div>
        <div className='BookingSubtitleContainer'>
          <p className='BookingSubtitle'>
            Jeśli jesteś zainteresowany przybyciem na naszą uroczystość
            <br />
            Wypełnij tę krótką ankiete!
          </p>
        </div>
        <div className='BookingFormContainer'>
          <p
            className='BookingFormElement'
            onClick={() => {
              setchecked({ ...checked, dinner: !checked.dinner });
            }}
          >
            <input
              type='checkbox'
              checked={checked.dinner}
              onChange={() => {
                setchecked(!checked);
              }}
            />
            Jestem zainteresowany posiłkiem na miejscu.
          </p>
        </div>
        <Button color='blue' value='Potwierdź' onClick={onSubmit} />
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className='BookingContainer'>{loggedIn ? <LoggedIn /> : <NotLoggedIn />}</div>
    </>
  );
}

export default BookingArivePage;
