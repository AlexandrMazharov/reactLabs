import "../Global.css";
import Cell from "./Cell";
import React from "react";

export default function Field(props) {
  const clickOnCell = (i, j) => props.userStep(i, j);

  return (
    <div className="field">
      {props.field.map((row, i) => {
        return row.map((item, j) => {
          return (
            <Cell
              setValue={clickOnCell}
              className="field__cell"
              value={item}
              i={i}
              j={j}
              key={i + j}
            />
          );
        });
      })}
    </div>
  );
}
