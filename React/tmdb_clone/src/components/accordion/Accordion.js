import React, { useState } from "react";

const Accordion = ({ title, digit, isOpen, setIsOpen, children }) => {
  return (
    <div
      className="dropdown_wrapper"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="name">
        <h2>
          {title}
          {digit && <span>{digit}</span>}
        </h2>
        <span
          className="dropdown_icon"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}
        ></span>
      </div>
      {isOpen && children}
    </div>
  );
};

export default Accordion;