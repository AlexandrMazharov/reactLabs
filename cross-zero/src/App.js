import "./Global.css";
import React, { useState, useEffect } from "react";
import Field from "./components/Field";
export const FIGURES = { CROSS: "X", ZERO: "O" };
export const FIRST_STEP = { PEOPE: "P", PC: "PC" };
function generateField() {
  const field = [];
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) row.push("");
    field.push(row);
  }
  return field;
}

function App() {
  useEffect(() => {
    setField(generateField());

    // eslint-disable-next-line no-restricted-globals
    const isUserCross = true; //confirm("{Желаете играть Крестиком?");
    // eslint-disable-next-line no-restricted-globals
    const isPCFirst = false; // confirm("ПК ходит первым?");
    if (isUserCross) {
      setUserFigure(FIGURES.CROSS);
      setPcFigure(FIGURES.ZERO);
    } else {
      setUserFigure(FIGURES.ZERO);
      setPcFigure(FIGURES.CROSS);
    }
    if (isPCFirst) {
      setIsPcFirst(true);
      isUserCross ? firstPcStep(FIGURES.ZERO) : firstPcStep(FIGURES.CROSS);
    }
  }, []);

  const [field, setField] = useState(generateField());
  // const [currentFigure, setCurrentFigure] = useState();
  const [userFigure, setUserFigure] = useState();
  const [pcFigure, setPcFigure] = useState();
  const [isPcFirst, setIsPcFirst] = useState();

  // используется только для определения финиша игры по окончанию пустых клеток
  const [currentStep, setCurrentStep] = useState(0);

  function firstPcStep(pcFigure) {
    updateField(1, 1, pcFigure);
  }
  function updateField(i, j, value) {
    let newField = [];
    newField = Object.assign(newField, field);
    newField[i][j] = value;
    setField(newField);
  }

  function userStep(i, j) {
    updateField(i, j, userFigure);
    if (isGameEnd()) return;
    stepPC();
  }

  function stepPC() {
    // проверка главной диагонали
    if (!field[0][0] && field[1][1] === field[2][2]) {
      updateField(0, 0, pcFigure);
      return;
    }
    if (!field[1][1] && field[0][0] === field[2][2]) {
      updateField(1, 1, pcFigure);
      return;
    }
    if (!field[2][2] && field[1][1] === field[0][0]) {
      updateField(2, 2, pcFigure);
      return;
    }
    // проверка вторичной диагонали
    if (!field[0][2] && field[1][1] === field[2][2]) {
      updateField(0, 2, pcFigure);
      return;
    }
    if (!field[1][1] && field[0][2] === field[2][0]) {
      updateField(1, 1, pcFigure);
      return;
    }
    if (!field[2][0] && field[1][1] === field[0][2]) {
      updateField(2, 0, pcFigure);
      return;
    }

    // проверка первой строки
    if (!field[0][0] && field[0][1] === field[0][2]) {
      updateField(0, 0, pcFigure);
      return;
    }
    if (!field[0][1] && field[0][0] === field[0][2]) {
      updateField(0, 1, pcFigure);
      return;
    }
    if (!field[0][2] && field[0][0] === field[0][1]) {
      updateField(0, 2, pcFigure);
      return;
    }
    // проверка второй строки
    if (!field[1][0] && field[1][1] === field[1][2]) {
      updateField(1, 0, pcFigure);
      return;
    }
    if (!field[1][1] && field[1][0] === field[1][2]) {
      updateField(1, 1, pcFigure);
      return;
    }
    if (!field[1][2] && field[1][0] === field[1][1]) {
      updateField(1, 2, pcFigure);
      return;
    }
    // проверка третьей строки
    if (!field[2][0] && field[2][1] === field[2][2]) {
      updateField(2, 0, pcFigure);
      return;
    }
    if (!field[2][1] && field[2][0] === field[2][2]) {
      updateField(2, 1, pcFigure);
      return;
    }
    if (!field[2][2] && field[2][0] === field[2][1]) {
      updateField(2, 2, pcFigure);
      return;
    }
    // проверка первого столбца
    if (!field[0][0] && field[1][0] === field[2][0]) {
      updateField(0, 0, pcFigure);
      return;
    }
    if (!field[1][0] && field[0][0] === field[2][0]) {
      updateField(1, 0, pcFigure);
      return;
    }
    // проверка третьего столбца
    if (!field[0][2] && field[1][2] === field[2][2]) {
      updateField(0, 2, pcFigure);
      return;
    }
    if (!field[1][2] && field[0][2] === field[2][2]) {
      updateField(1, 2, pcFigure);
      return;
    }
    if (!field[2][2] && field[0][2] === field[1][2]) {
      updateField(2, 2, pcFigure);
      return;
    }
    randomStep();
    return;
  }
  function randomStep() {
    let i, j;
    do {
      i = getRandomInt();
      j = getRandomInt();
    } while (field[i][j]);
    updateField(i, j, pcFigure);
  }

  const getRandomInt = () => Math.floor(Math.random() * field[0].length);

  function isGameEnd() {
    const countEptyCell = field.flat().filter((cell) => !cell).length;
    if (countEptyCell === 0) {
      console.log("пустых полей нет");
      return true;
    }
  }

  return (
    <div className="app">
      <div className="config"></div>
      <Field field={field} userStep={userStep} />
    </div>
  );
}

export default App;
