import Header from '../components/Header';
import StartPageInvite from '../components/StartPageComponents/StartPageInvite';
import StartPageBanner from '../components/StartPageComponents/StartPageBanner';
import StartPageParalax from '../components/StartPageComponents/StartPageParalax';
import StartPageEventSchedule from '../components/StartPageComponents/StartPageEventSchedule';
import Footer from '../components/Footer';
import StartPageGallery from '../components/StartPageComponents/StartPageGallery';

function StartPage() {
  return (
    <>
      <Header />
      <StartPageBanner />
      <StartPageInvite />
      <StartPageEventSchedule />
      <StartPageParalax />
      <StartPageGallery />
      <Footer />
    </>
  );
}
export default StartPage;
