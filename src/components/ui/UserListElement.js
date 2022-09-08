import { useEffect, useState } from 'react';
import { deleteUser, updateUser } from '../../api/database';
import '../../css/UserListElement.css';
import { capitalizeFirstLetter } from '../../utils/utils';
import ModifyUser from '../Modal/ModifyUser';

function UserListElement({ data, onDeleteUser }) {
  const [user, setUser] = useState(data);

  useEffect(() => {
    setUser(data);
  }, [data]);

  function acceptUser() {
    updateUser({ ...user, accepted: true });
    setUser({ ...user, accepted: true });
  }
  function updateUserData(userData) {
    setUser(userData);
  }
  async function removeUser() {
    const deleted = await deleteUser(user.email);
    if (deleted) {
      onDeleteUser();
    }
  }

  return (
    <div className='ULEmain'>
      <div className='ULElist'>
        <div className='ULEline'>
          <div className='ULEuser'>
            <div className='ULEprofile'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                alt='img'
                width='50px'
                height='50px'
              />
            </div>
            <div className='ULEdetails'>
              <h1 className='ULEname'>
                {capitalizeFirstLetter(user.firstName)} {capitalizeFirstLetter(user.lastName)}
              </h1>
              <h3 className='ULEemail'>{user.email}</h3>
            </div>
            <div className='ULEstatus'>
              <div className='ULEstatusRow'>
                {user.accepted ? (
                  <span className='ULEaccepted'></span>
                ) : (
                  <span className='ULEpending'></span>
                )}
                <p className='ULEp'>{user.accepted ? 'Zakceptowany' : 'Oczekujący'}</p>
              </div>
              <div className='ULEstatusRow'>
                {user.arrival ? (
                  <span className='ULEaccepted'></span>
                ) : (
                  <span className='ULEpending'></span>
                )}
                <p className='ULEp'>{user.arrival ? 'Przyjedzie' : 'Nie Przyjedzie'}</p>
              </div>
              <div className='ULEstatusRow'>
                {user.dinner ? (
                  <span className='ULEaccepted'></span>
                ) : (
                  <span className='ULEpending'></span>
                )}
                <p className='ULEp'>{user.dinner ? 'Z obiadem' : 'Bez obiadu'}</p>
              </div>
            </div>
            <div className='ULElocaiton'>
              <p className='ULEp'>{user.year}</p>
            </div>
            <div className='ULESchool'>
              <p className='ULEp'>{capitalizeFirstLetter(user.school)}</p>
            </div>
            {!user.accepted ? (
              <div className='ULEcontact'>
                <div onClick={acceptUser} className='ULEbtn ULEgreen'>
                  Akceptuj
                </div>
                <div className='ULEbtn ULEred' onClick={removeUser}>
                  Odrzuć
                </div>
                <ModifyUser onUpdateUser={updateUserData} className='ULEbtn ULEblue' data={user} />
              </div>
            ) : (
              <div className='ULEcontact'>
                <div className='ULEbtn ULEred ULEacc' onClick={removeUser}>
                  Usuń
                </div>
                <ModifyUser
                  onUpdateUser={updateUserData}
                  className='ULEbtn ULEblue ULEacc'
                  data={user}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserListElement;
