import React from "react";
import "../scss/components/Footer.scss";
import { TOFUGU_LINK, WORD_LINK, MARSHALSITE_LINK } from "../constants";

const Footer = () => {
  return (
    <div className="main-footer">
      <div>
        <p>
          {"Mnemonics taken from "}
          <a href={TOFUGU_LINK}>tofugu.com</a>
        </p>
        <p>
          {"Japanese words taken from "}
          <a href={WORD_LINK}>reddit.com/r/LearnJapanese</a>
          {", and "}
          <a href={MARSHALSITE_LINK}>marshallyin.com/katakana-list</a>
        </p>
      </div>
      <hr />
      <div className="copyright">
        <small>
          Copyright © 2020 Tuan Le, Lien Tran. All Rights Reserved.
        </small>
      </div>
    </div>
  );
};

export default Footer;
