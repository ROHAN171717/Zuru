import React from 'react';
import './checkboxWrapper.css';
import toggleItemInArray from '../../../../helper';

function CheckboxWrapper({ items, selectedItems, setSelectedItems }) {
  return (
    <ul>
      {items.map((item) => (
        <div className="availability" key={item.id}>
          <input
            type="checkbox"
            id={item.name}
            className="availability_checkbox"
            onChange={() => setSelectedItems(toggleItemInArray(selectedItems, item))}
            checked={selectedItems?.includes(item)}
          />
          <label htmlFor={item.name} className="availability_desc">
            {item.name}
          </label>
        </div>
      ))}
    </ul>
  );
}

export default CheckboxWrapper;
