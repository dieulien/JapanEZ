import React from "react";
import "./Footer.css";
import { TOFUGU_LINK, WORD_LINK } from "../constants";

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row"></div>
      </div>
      <p>
        Mnemonics taken from <a href={TOFUGU_LINK}>tofugu.com</a>
      </p>
      <p>
        Japanese words taken from{" "}
        <a href={WORD_LINK}>reddit.com/r/LearnJapanese</a>
      </p>
    </div>
  );
};

export default Footer;
