import { Link } from 'react-router-dom';
import './css/StartPageBanner.css';
import logo from '../../images/logo.png';
import logoNisko from '../../images/logoNisko.png';
function StartPageBanner() {
  return (
    <section className='splash'>
      <div className="backgrColor">
        <div className='page-intro'>
          <div className="logoContainer"><img className="logosSize" src={logo} alt="logo"/></div>
          <div className="bannerCenter">
            <h1 className='main-title'>70-cio lecie</h1>
            <h2 className='main-subtitle'>Regionalnego centrum edukacji zawodowej</h2>
            <Link to="/potwierdz-przybycie">
              <a className='btn btn-solid' href='#Historiaszkoły'>
                POTWIERDŹ PRZYBYCIE
              </a>
            </Link>
          </div>
          <div className="logoContainer rightLogo"><img className="logosSize" src={logoNisko} alt="logo"/></div>
        </div>
      </div>
    </section>
  );
}
export default StartPageBanner;
