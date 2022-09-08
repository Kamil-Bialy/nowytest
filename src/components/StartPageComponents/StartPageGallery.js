import './css/StartPageGallery.css';
import ImageGallery from 'react-image-gallery';

function StartPageGallery() {
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];
  return (
    <section className='SPABgallery'>
      <h2 className='SPABsection-title'>Galeria</h2>
      <ImageGallery items={images} autoPlay={true} showPlayButton={false} slideDuration={700} showFullscreenButton={false}/>
    </section>
  );
}
export default StartPageGallery;
