import '../css/Story.css';
import ModifyStory from './Modal/ModifyStory';

function Story({ data, role, onAcceptStory, onRemoveStory }) {
  function acceptStory() {
    onAcceptStory(data.stories);
  }

  function removeStory() {
    onRemoveStory(data.stories._id);
  }

  return (
    <div className='STmain'>
      <div className='STcontainer' key={data.stories._id}>
        {data.stories.image && (
          <div className='STPhotoContainer'>
            <img
              className='STphoto'
              src={'data:image/png;base64,' + data.stories.image}
              alt='zdjecie'
            />
          </div>
        )}
        {data.stories.title ? <h3 className='STtitle'>{data.stories.title}</h3> : null}
        <blockquote>
          {data.stories.text ? <p className='STsubText'>{data.stories.text.trim()}</p> : null}
        </blockquote>
        {role && !data.stories.accepted ? (
          <div className='STbuttoncontainer'>
            <div onClick={acceptStory} className='ULEbtn ULEgreen ULEacc'>
              Akceptuj
            </div>
            <div className='ULEbtn ULEred ULEacc ' onClick={removeStory}>
              Odrzuć
            </div>
            <ModifyStory onAddStory={acceptStory} data={data} className='ULEbtn ULEblue ULEacc' />
          </div>
        ) : null}
        {role && data.stories.accepted ? (
          <div className='ULEcontact'>
            <div className='ULEbtn ULEred ULEacc' onClick={removeStory}>
              Usuń
            </div>
            <ModifyStory onAddStory={acceptStory} data={data} className='ULEbtn ULEblue ULEacc' />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Story;
