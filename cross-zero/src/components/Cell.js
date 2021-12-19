import "../Global.css";
import React from "react";
export default function Сell(props) {
  return (
    <div
      className="field__cell"
      onClick={
        !props.value ? () => props.setValue(props.i, props.j) : undefined
      }
    >
      {props.value == "" && <p></p>}
      {props.value == "O" && <p>0</p>}
      {props.value == "X" && <p>X</p>}
    </div>
  );
}
