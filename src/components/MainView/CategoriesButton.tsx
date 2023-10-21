import React, { useState, useRef, useEffect } from 'react';
import './CategoriesButton.scss';
import Node from './Node';

interface CategoriesButtonProps {
  zoomLevel: number;
}

const CategoriesButton: React.FC<CategoriesButtonProps> = ({ zoomLevel }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [childNodes, setChildNodes] = useState<Array<{name: string, children: any[]}>>([]);
  const ref = useRef<HTMLDivElement>(null);

  const renderNode = (node: {name: string, children: any[]}) => {
    return (
      <div className="categoriesButton__node">
        <Node name={node.name} />
        {node.children.map(childNode => renderNode(childNode))}
      </div>
    );
  };

  const handleAddNode = () => {
    const newNodeName = prompt('Ingrese el nombre del nodo:', '');
    if (newNodeName) {
      setChildNodes(prevChildNodes => [...prevChildNodes, {name: newNodeName, children: []}]);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          const offsetX = event.clientX - rect.width / 2;
          const offsetY = event.clientY - rect.height / 2;

          const minX = 0;
          const minY = 0;
          const maxX = window.innerWidth - rect.width;
          const maxY = window.innerHeight - rect.height;

          const x = Math.min(Math.max(offsetX, minX), maxX);
          const y = Math.min(Math.max(offsetY, minY), maxY);

          setPosition({
            x: (x / (zoomLevel / 100)),
            y: (y / (zoomLevel / 100))
          });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, zoomLevel]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
  };

  return (
    <div className="categoriesButtonContainer" style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`
        }}>
      <button className="categoriesButton__addButton" onClick={handleAddNode}>+</button>
      <div
        className={`categoriesButton ${isDragging ? 'isDragging' : ''}`}
        ref={ref}
        onMouseDown={handleMouseDown}
      >
        <div className="categoriesButton__header">
          Categories
        </div>
      </div>
      <div className="categoriesButton__nodes">
        {childNodes.map((node, index) => (
          <div className="categoriesButton__node" key={index}>
            {renderNode(node)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesButton;
