import React, { useState } from "react";
import style from "./style.module.css";

const App = () => {
  const [x, setX] = useState(true);
console.log(x);

  if (x) {
    return (
      <>
        <button onClick={() => setX(!x)}>click</button>
        <h1>hello</h1>
        <Demo />
      </>
    );
  }
  return (
    <div className={style.header}>
        <button onClick={() => setX(!x)}>click</button>

      App
      <p className={`${style.desc} ${style.gapp}`}>Hello</p>
      <Demo />
    </div>
  );
};

function Demo() {
  return <h1>Demo</h1>;
}

export default App;
