import React from "react";

function TextOutputField(props) {
  return (
    <span className={props.className} style={props.style}>
      <span>{props.value}</span>
    </span>
  );
}

export default TextOutputField;
