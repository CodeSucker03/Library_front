import React, { useState } from 'react';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const items = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={toggleDropdown} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        {selectedItem || 'Select an option'}
      </button>
      {isOpen && (
        <ul style={{
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          position: 'absolute',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          width: '100%',
          boxShadow: '0px 8px 16px rgba(0,0,0,0.1)'
        }}>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                borderBottom: '1px solid #ccc'
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;