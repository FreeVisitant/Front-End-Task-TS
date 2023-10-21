import React from 'react';
import './MainView.scss';


import CategoriesButton from './CategoriesButton';

interface MainViewProps {
  zoomLevel: number;
}

const MainView: React.FC<MainViewProps> = ({ zoomLevel }) => {
  const zoomStyle = {
    transform: `scale(${zoomLevel / 100})`
  };

  return (
    <div className="mainView" style={zoomStyle}>
      {/* Insertar componentes despues */}
      <CategoriesButton zoomLevel={zoomLevel} />

      <p>Main View Content</p>
    </div>
  );
  
}

export default MainView;
