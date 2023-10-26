import React from "react";
import "./checkboxWrapper.css";
import toggleItemInArray from "../../../../helper";

const CheckboxWrapper = ({ items, selectedItems, setSelectedItems }) => {
  return (
    <ul>
      {items.map((item) => (
        <div className="availability">
          <input
            type="checkbox"
            id="availability"
            className="availability_checkbox"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={() =>
              setSelectedItems(toggleItemInArray(selectedItems, item))
            }
            checked={selectedItems?.includes(item)}
          />
          <label for="availability" className="availability_desc">
            {item.name}
          </label>
        </div>
      ))}
    </ul>
  );
};

export default CheckboxWrapper;
