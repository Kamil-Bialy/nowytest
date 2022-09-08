import LoadingOverlay from '../ui/LoadingOverlay';
import '../../css/ParticipantsSchoolMates.css';
import { capitalizeFirstLetter } from '../../utils/utils';

function ParticipantsSchoolMates({ isLoaded, schoolMates }) {
  return (
    <div>
      <ul className='PCMul'>
        {isLoaded ? (
          schoolMates.map(item => {
            return (
              <li key={item._id} className='PCMli'>
                <div className='PCMcon'>
                  <div className='PCMcon1'>
                    <img
                      className='PCMuserimg'
                      src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                      alt='img'
                    />
                    <div className='PCMinnercon'></div>
                  </div>
                  <div className='PCMsidebox'>
                    <span className='PCMspanstyle'>
                      <b>{capitalizeFirstLetter(item.firstName)} </b>
                      <b>{capitalizeFirstLetter(item.lastName)}</b>
                    </span>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <LoadingOverlay />
        )}
      </ul>
    </div>
  );
}
export default ParticipantsSchoolMates;
