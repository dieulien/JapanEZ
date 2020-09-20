import React from "react";
import "../scss/components/TextBlock.scss";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

const TextBlock = ({ title, description, icon }) => {
  return (
    <div className="text-block">
      {icon}
      <h3>{title}</h3>
      <div>{description}</div>
    </div>
  );
};

export default TextBlock;
