import React, { useState, useContext } from 'react';
import { addStory } from '../../api/database';
import { UserContext } from '../../store/user-context';
import Button from '../ui/Button';
import './Modal.css';

function ModifyStory({ data, className, onAddStory }) {
  const { userId } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [story, setStory] = useState({
    title: data.stories.title ?? '',
    text: data.stories.text ?? '',
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  async function onSubmit() {
    const data = {
      storyTitle: story.title,
      storyText: story.text,
      userId: userId,
    };

    await addStory(data);
    onAddStory();
    setModal(!modal);
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
            <h2>Dodaj Wspomnienie</h2>
            <div className='modalContentInputs'>
              <input
                type='text'
                placeholder='Tytuł wspomnienia'
                className='modalTitle'
                onChange={e => {
                  setStory(prev => ({ ...prev, title: e.target.value }));
                }}
                value={story.title}
              />
              <textarea
                rows='10'
                cols='70'
                maxLength='2200'
                style={{ resize: 'none' }}
                className='modalTextArea'
                placeholder='Opisz swoje wspomnienie'
                onChange={e => {
                  setStory(prev => ({ ...prev, text: e.target.value }));
                }}
                value={story.text}
              ></textarea>
            </div>
            <button className='closeModal' onClick={toggleModal}>
              X
            </button>
            <Button value='Zmień' onClick={onSubmit} color='blue' />
          </div>
        </div>
      )}
    </>
  );
}

export default ModifyStory;
