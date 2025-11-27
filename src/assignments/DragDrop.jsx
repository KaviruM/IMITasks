import React from 'react'
import './DragDrop.css';

function DragDrop() {
    const [items, setItems] = React.useState([
        'Item 1', 
        'Item 2', 
        'Item 3', 
        'Item 4', 
        'Item 5'
    ]);
    const [dragIndex, setDragIndex] = React.useState(null);


    const handleDragStart = (e, index) => {
        setDragIndex(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        
        if (dragIndex === null) return;

        const newItems = [...items];
        const draggedItem = newItems[dragIndex];
        
        newItems.splice(dragIndex, 1);
        newItems.splice(dropIndex, 0, draggedItem);
        
        setItems(newItems);
        setDragIndex(null);
    };

    return (
        <div className="drag-drop-container">
            <h1>Drag and Drop</h1>
            
            <div className="drag-drop-list">
                {items.map((item, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className="drag-drop-item"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DragDrop;