import React from 'react';
import './sectionTitle.css';
import SelectMenu from '../selectMenu/SelectMenu';

function SectionTitle({
  title, items, setId, id, selectedItem,
}) {
  function handleClick(select) {
    setId(select.id);
  }

  return (
    <div className="section_header">
      <h2>{title}</h2>
      <div className="selector-wrap">
        <div className="selector">
          {items.map((item) => (
            <div
              key={item.name}
              className={`anchor ${
                selectedItem === item.name ? 'selected' : ''
              }`}
              onClick={() => handleClick(item)}
            >
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
        <div className="vertical_selector">
          <SelectMenu
            items={items}
            title="order"
            selectedValue={id}
            changeSelectedValue={(value) => handleClick(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SectionTitle;
