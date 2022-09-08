import { Link } from 'react-router-dom';
import './css/StartPageEventSchedule.css';
function StartPageEventSchedule() {
  return (
    <section className='SPSHabout' id='Historiaszkoły'>
      <div className='SPSHcontainer'>
        <h2 className='SPSHsection-title'>RAMOWY PLAN JUBILEUSZU SZKOŁY</h2>
        <ul className='SPSHsection-intro'>
          <li>Msza Święta w kościele OO.  Franciszkanów w Zamościu</li>
          <li>Oficjalne uroczystości w CKF  Stylowy w Zamościu</li>
          <li>Spotkania Absolwentów w budynku szkoły</li>
          <li>Pomidorowa w internacie</li>
          <li>Bal Absolwentów</li>
        </ul>
        
      </div>
    </section>
  );
}
export default StartPageEventSchedule;
