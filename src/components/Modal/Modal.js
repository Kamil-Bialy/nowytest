import React, { useState, useContext, useEffect } from 'react';
import { addStory } from '../../api/database';
import { UserContext } from '../../store/user-context';
import Button from '../ui/Button';
import LoadingOverlay from '../ui/LoadingOverlay';
import { Validation } from '../validation/validation';
import ImageUploader from './ImageUploader';
import './Modal.css';

const initialErrors = {
  titleError: '',
  textError: '',
};

const initialStory = {
  title: '',
  text: '',
  image: null,
};

export default function Modal({ onAddStory, isAccepted }) {
  const { userId } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [story, setStory] = useState(initialStory);
  const [errors, setErrors] = useState(initialErrors);
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  function changeImage(e) {
    setStory(prev => ({ ...prev, image: e.target.files[0] }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const newErrors = {
      titleError: Validation.title(story.title),
      textError: Validation.text(story.text),
    };
    setErrors(newErrors);

    if (JSON.stringify(newErrors) !== JSON.stringify(initialErrors)) {
      return;
    }

    setisLoading(true);

    const formData = new FormData();
    formData.append('storyTitle', story.title);
    formData.append('storyText', story.text);
    formData.append('userId', userId);
    formData.append('storyImage', story.image);

    const response = await addStory(formData);
    if (response.error) {
      setisLoading(false);
      alert(response.error);
      return;
    }
    setStory(initialStory);
    onAddStory();
    setisLoading(false);
    setModal(!modal);
  }

  useEffect(() => {
    async function init() {
      const accepted = await isAccepted();
      setAccepted(accepted);
      setStory(initialStory);
    }

    init();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      {accepted ? (
        <button onClick={toggleModal} className='btnModal'>
          <p>Dodaj wspomnienie</p>
        </button>
      ) : null}

      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modalContent'>
            <h2>Dodaj Wspomnienie</h2>
            <form onSubmit={onSubmit} className='modalContentInputs' encType='multipart/form-data'>
              <ImageUploader image={story.image} changeImage={changeImage} />
              <input
                type='text'
                name='storyTitle'
                placeholder='Tytuł wspomnienia'
                className='modalTitle'
                onChange={e => {
                  setStory(prev => ({ ...prev, title: e.target.value }));
                }}
                onBlur={() => {
                  setErrors(prev => ({ ...prev, titleError: Validation.title(story.title) }));
                }}
                value={story.title}
              />
              <p className='inputErrorText'>{errors.titleError}</p>
              <textarea
                rows='10'
                name='storyText'
                cols='70'
                maxLength='2200'
                style={{ resize: 'none' }}
                className='modalTextArea'
                placeholder='Opisz swoje wspomnienie'
                onChange={e => {
                  setStory(prev => ({ ...prev, text: e.target.value }));
                }}
                onBlur={() => {
                  setErrors(prev => ({ ...prev, textError: Validation.text(story.text) }));
                }}
                value={story.text}
              />
              <p className='inputErrorText'>{errors.textError}</p>
            </form>
            <button type='submit' className='closeModal' onClick={toggleModal}>
              X
            </button>
            <Button value='Dodaj' onClick={onSubmit} color='blue' />
          </div>
        </div>
      )}
    </>
  );
}
