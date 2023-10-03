import React, { useContext } from "react";
import { DarkmodeContext } from "./DarkmodeContext";
import LightSwitch from "./LightSwitch";

const Container = () => {
  const { darkMode } = useContext(DarkmodeContext);
  console.log(darkMode);
  
  return (
    <div style={{ background: darkMode ? "black" : "white" , width: "100vw", height:"100vw"}}>
      <LightSwitch />
    </div>
  );
};

export default Container;
