import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MainView from './components/MainView/MainView';

const App: React.FC = () => {
    // Estado para el nivel de zoom
    const [zoomLevel, setZoomLevel] = useState(100); // 100% es el nivel de zoom predeterminado

    const handleZoomIn = () => {
        // Aumenta el zoom en un 10%, con un máximo del 150%
        setZoomLevel(prevZoom => Math.min(prevZoom + 10, 150));
    }

    const handleZoomOut = () => {
        // Disminuye el zoom en un 10%, con un mínimo del 50%
        setZoomLevel(prevZoom => Math.max(prevZoom - 10, 50));
    }

    const handleCenter = () => {
        // La lógica para centrar puede ser ampliada más tarde
    }

    return (
        <div className="App">
            <Navbar onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onCenter={handleCenter} />
            <MainView zoomLevel={zoomLevel} />
        </div>
    );
}

export default App;
