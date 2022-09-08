import Header from '../components/Header';
import { checkRole, getSchoolMates, getUsers, searchUsers } from '../api/database';
import { useEffect, useState, useContext } from 'react';
import UserListElement from '../components/ui/UserListElement';
import '../css/UserListElement.css';
import { UserContext } from '../store/user-context';
import ParticipantsSchoolMates from '../components/StartPageComponents/ParticipantsSchoolMates';
import '../components/../css/ParticipantsPage.css';
import SearchBar from '../components/SearchBar';

function ParticipantsPage() {
  const { userId, loggedIn } = useContext(UserContext);

  const [search, setSearch] = useState({
    searchby: 'firstName',
    value: '',
  });

  const [role, setRole] = useState();
  const [users, setUsers] = useState([
    {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      year: 0,
      school: '',
    },
  ]);
  const [schoolMates, setSchoolMates] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  function onDeleteUser() {
    displayUsers();
  }

  async function displayUsers() {
    setIsLoaded(false);
    const list = await getUsers();
    setUsers(list);
    setIsLoaded(true);
  }

  async function displaySchoolMates() {
    setIsLoaded(false);
    const tempSchoolMates = getSchoolMates(userId);
    tempSchoolMates.then(res => {
      if (res) {
        setSchoolMates(res.schoolMates);
      } else {
        setSchoolMates([]);
      }
      setIsLoaded(true);
    });
  }

  async function getRole() {
    const role = await checkRole(userId);
    setRole(role.user.roleID);
    return role.user.roleID;
  }

  async function searchForUsers() {
    const list = await searchUsers(search);
    if (role) {
      setUsers(list.response);
    } else {
      setSchoolMates(list.response);
    }
  }

  useEffect(() => {
    async function init() {
      const role = await getRole();
      if (role) {
        displayUsers();
      } else {
        displaySchoolMates();
      }
    }
    init();
  }, []);

  return (
    <>
      <Header />
      <div className='PGmainContainer'>
        {loggedIn && role === 1 ? (
          <>
            <div className='searchBarWrapper'>
              <SearchBar
                search={search}
                setSearch={setSearch}
                display={role ? displayUsers : displaySchoolMates}
                onSearch={searchForUsers}
              />
            </div>
            {users.map(listItem => {
              return (
                <UserListElement key={listItem.email} data={listItem} onDeleteUser={onDeleteUser} />
              );
            })}
          </>
        ) : loggedIn ? (
          <>
            <div className='searchBarWrapper'>
              <SearchBar
                search={search}
                setSearch={setSearch}
                display={role ? displayUsers : displaySchoolMates}
                onSearch={searchForUsers}
              />
            </div>
            {search.value === '' ? <p>Lista osób z twojej szkoły z twojego roku</p> : null}
            <ParticipantsSchoolMates isLoaded={isLoaded} schoolMates={schoolMates} />
          </>
        ) : (
          'Musisz się zalogować aby zobaczyć uczestników'
        )}
      </div>
    </>
  );
}

export default ParticipantsPage;
