import React from 'react';
import './filterList.css';
import toggleItemInArray from '../../../../helper';

function FilterList({ items, selectedItems, setSelectedItems }) {
  return (
    <div className="filter_list">
      {items.map((item) => (
        <div
          key={item.name || item}
          className={`filter_list_item ${
            selectedItems.includes(item) ? 'selected' : ''
          }`}
          onClick={() => setSelectedItems(toggleItemInArray(selectedItems, item))}
        >
          {item.name || item}
        </div>
      ))}
    </div>
  );
}

export default FilterList;
