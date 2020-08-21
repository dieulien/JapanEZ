import React from "react";
import "../scss/components/Footer.scss";
import { TOFUGU_LINK, WORD_LINK } from "../constants";

const Footer = () => {
  return (
    <div className="main-footer">
      <div>
        <p>
          Mnemonics taken from <a href={TOFUGU_LINK}>tofugu.com</a>
        </p>
        <p>
          Japanese words taken from{" "}
          <a href={WORD_LINK}>reddit.com/r/LearnJapanese</a>
        </p>
      </div>
      <hr />
      <div className="copyright">
        <small>Copyright © 2020 Tuan Le, Lien Tran. All Rights Reserved</small>
      </div>

      {/* uncomment below for 2nd layout */}
      {/* <div className="container">
        <div className="row">
          <div className="col">
            <ul className="list-unstyled">
              <li>
                Mnemonics taken from <a href={TOFUGU_LINK}>tofugu.com</a>
              </li>
              <li>
                Japanese words taken from{" "}
                <a href={WORD_LINK}>reddit.com/r/LearnJapanese</a>
              </li>
            </ul>
          </div>
          <div className="col copyright">
            <small>
              Copyright © 2020 Tuan Le, Lien Tran. All Rights Reserved
            </small>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
