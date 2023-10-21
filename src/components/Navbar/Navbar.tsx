import React from 'react';
import './Navbar.scss';

interface NavbarProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onCenter: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onZoomIn, onZoomOut, onCenter }) => {
    return (
        <div className="navbar">
            <div className="logo">
                <div className="octagon">0</div>
                Services
            </div>
            <div className="menu-items">
                <button className="list-view-btn">List View</button>
                <button className="center-btn" onClick={onCenter}>Go to Center</button>
                <button className="zoom-out-btn" onClick={onZoomOut}>-</button>
                <span className="zoom-percentage">100%</span> {/* Este valor será dinámico más adelante */}
                <button className="zoom-in-btn" onClick={onZoomIn}>+</button>
            </div>
        </div>
    );
}

export default Navbar;
