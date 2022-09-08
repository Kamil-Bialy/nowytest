import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../store/user-context';
import Modal from '../components/Modal/Modal';
import Header from '../components/Header';
import {
  checkRole,
  deleteStory,
  getStories,
  getUser,
  searchStories,
  updateStory,
} from '../api/database';
import Story from '../components/Story';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import Pagination from '../components/Pagination';
import '../css/StoriesPage.css';
import SearchBar from '../components/SearchBar';

function StoriesPage() {
  const { userId, loggedIn } = useContext(UserContext);
  const [role, setRole] = useState();

  const [stories, setStories] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [search, setSearch] = useState({
    searchby: 'firstName',
    value: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 5;
  const indexOfLastRecord = currentPage * storiesPerPage;
  const indexOfFirstRecord = indexOfLastRecord - storiesPerPage;
  let currentStories = stories.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(stories.length / storiesPerPage);

  async function getAllStories() {
    const allStories = await getStories();
    let accepted = [];
    let notAccepted = [];
    allStories.forEach(story => {
      if (story.stories.accepted) {
        accepted.push(story);
      } else {
        notAccepted.push(story);
      }
    });
    const role = await getRole();
    if (role) {
      setStories(notAccepted.concat(accepted));
    } else {
      setStories(accepted);
    }
    setIsLoading(false);
  }

  async function acceptStory(story) {
    await updateStory({ ...story, accepted: true });
    getAllStories();
  }

  async function removeStory(id) {
    await deleteStory({ id: id, userId: userId });
    getAllStories();
  }

  async function getRole() {
    const role = await checkRole(userId);
    setRole(role.user.roleID);
    return role.user.roleID;
  }

  async function isAccepted() {
    const user = await getUser(userId);
    return user.accepted;
  }

  async function searchForStories() {
    const list = await searchStories(search);
    setStories(list.response);
  }

  useEffect(() => {
    setIsLoading(true);
    getAllStories();
  }, []);

  return (
    <>
      <Header />
      {loading ? <LoadingOverlay /> : null}

      <div className='storiesWrapper'>
        {loggedIn && role !== 1 ? (
          <Modal onAddStory={getAllStories} isAccepted={isAccepted} />
        ) : null}
      </div>
      {currentStories.map(story => {
        return (
          <Story
            key={story.stories.added}
            data={story}
            role={role}
            onAcceptStory={acceptStory}
            onRemoveStory={removeStory}
          />
        );
      })}
      <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default StoriesPage;
