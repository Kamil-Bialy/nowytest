import Footer from '../components/Footer';
import LeftSide from '../components/LeftSide';
import RightSide from '../components/RightSide';
import '../css/LoginPage.css';
function LoginPage() {
  return (
    <div className='loginPageContainer'>
      <LeftSide />
      <RightSide />
      <Footer />
    </div>
  );
}
export default LoginPage;
