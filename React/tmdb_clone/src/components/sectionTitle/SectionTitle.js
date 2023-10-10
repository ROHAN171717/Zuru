import React, { useState } from "react";
import "./sectionTitle.css";

const SectionTitle = ({ title, items, setId }) => {
  const [selected, setSelected] = useState(items[0].name);

  function handleClick(select) {
    setSelected(select.name);
    setId(select.id);
  }

  return (
    <div className="section_header">
      <h2>{title}</h2>
      <div className="selector-wrap">
        <div className="selector">
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={`anchor ${selected === item.name ? "selected" : ""}`}
                onClick={() => handleClick(item)}
              >
                <h3>
                  <a href="#">{item.name}</a>
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
