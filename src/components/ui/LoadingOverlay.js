import React from 'react';
import '../../css/LoadingOverlay.css';

export default function LoadingOverlay() {
  return (
    <div className='loadingContainer'>
      <div className='loadingSpinner'></div>
    </div>
  );
}
