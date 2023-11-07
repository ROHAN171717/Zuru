import React, { useState } from 'react';
import './accordian.css';

function Accordion({
  title, digit, isAccordianOpen, children,
}) {
  const [isOpen, setIsOpen] = useState(isAccordianOpen);
  return (
    <div
      className="dropdown_wrapper"
    >
      <div className="name" onClick={() => setIsOpen(!isOpen)}>
        <h2>
          {title}
          {digit && <span>{digit}</span>}
        </h2>
        <span
          className="dropdown_icon"
          style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }}
        />
      </div>
      {isOpen && children}
    </div>
  );
}

export default Accordion;
