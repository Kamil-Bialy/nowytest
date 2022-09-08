import React, { useState } from 'react';
import { updateUser } from '../../api/database';
import { capitalizeFirstLetter } from '../../utils/utils';
import Button from '../ui/Button';
import './Modal.css';

export default function ModifyUser({ onAddStory, className, data, onUpdateUser }) {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(data);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  async function onSubmit() {
    updateUser(user);
    onUpdateUser(user);
    setModal(!modal);
  }
  function onCancel() {
    setUser(data);
    toggleModal();
  }

  return (
    <>
      <div onClick={toggleModal} className={className}>
        Modyfikuj
      </div>

      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modalContent'>
            <h2>Edycja Użytkownika</h2>
            <div className='modalContentInputs'>
              <p className='MUpi'>
                Imię:
                <input
                  className='MUinput'
                  type='text'
                  value={capitalizeFirstLetter(user.firstName)}
                  onChange={e => setUser({ ...user, firstName: e.target.value })}
                />
              </p>
              <p className='MUpi'>
                Nazwisko:
                <input
                  className='MUinput'
                  type='text'
                  value={capitalizeFirstLetter(user.lastName)}
                  onChange={e => setUser({ ...user, lastName: e.target.value })}
                />
              </p>
              <p className='MUpi'>
                Klasa:
                <input
                  className='MUinput'
                  type='text'
                  value={user.school}
                  onChange={e => setUser({ ...user, school: e.target.value })}
                />
              </p>
              <p className='MUpi'>
                Rok ukończenia:
                <input
                  className='MUinput'
                  type='text'
                  value={user.year}
                  onChange={e => setUser({ ...user, year: e.target.value })}
                />
              </p>
              <p className='MUpi'>
                Email:
                <input
                  className='MUinput'
                  type='text'
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                />
              </p>
            </div>
            <button className='closeModal' onClick={toggleModal}>
              X
            </button>
            <Button value='Akceptuj' color='blue' onClick={onSubmit} />
            <Button value='Anuluj' color='red' onClick={onCancel} />
          </div>
        </div>
      )}
    </>
  );
}
