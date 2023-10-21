import React, { useState } from 'react';
import './Node.scss';

interface NodeProps {
  name?: string;
  isRoot?: boolean;
  onAdd?: () => void;
  onEdit?: (name: string) => void;
  onDelete?: () => void;
}

const Node: React.FC<NodeProps> = ({ name = '', isRoot = false, onAdd, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nodeName, setNodeName] = useState(name);
  const [childNodes, setChildNodes] = useState<string[]>([]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit && onEdit(nodeName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(e.target.value);
  };

  const handleAddChildNode = () => {
    const newNodeName = prompt('Ingrese el nombre del nodo hijo:', '');
    if (newNodeName) {
      setChildNodes(prevChildNodes => [...prevChildNodes, newNodeName]);
    }
  };

  const handleDeleteChildNode = (index: number) => {
    setChildNodes(prevChildNodes => prevChildNodes.filter((_, i) => i !== index));
  };

  return (
    <div className={`node ${isRoot ? 'root-node' : ''}`}>
      <div className="node-buttons">
        <button onClick={handleAddChildNode}>+</button>
        <button onClick={handleEditClick}>✎</button>
        {!isRoot && <button onClick={onDelete}>✖</button>}
      </div>
      <div className="node-header">
        {isEditing ? (
          <>
            <input value={nodeName} onChange={handleInputChange} />
            <button onClick={handleSaveClick}>✔</button>
          </>
        ) : (
          <span className="node-name">{nodeName}</span>
        )}
      </div>
      <div className="child-nodes">
        {childNodes.map((childNodeName, index) => (
          <div className="child-node" key={index}>
            <Node 
              name={childNodeName}
              onDelete={() => handleDeleteChildNode(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Node;
