import React from "react";
import "../containers/App.css";
import "./Char.css";

const Char = (props) => {
  const className = `tmw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 ${props.cardState}`;
  return (
    <div className={className}>
      <h1 className="char">{props.char}</h1>
    </div>
  );
};

export default Char;
