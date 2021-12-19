import "./Global.css";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import React, { useState } from "react";
import Field from "./components/Field";
export const FIGURES = { CROSS: "X", ZERO: "O" };
export const FIRST_STEP = { PEOPE: "P", PC: "PC" };

function App() {
  const generateField = () =>
    new Array(3).fill("").map((row) => new Array(3).fill(""));
  const firstGameSettings = {
    firstFigure: FIGURES.CROSS,
    isUserFirst: true,
  };
  const [field, setField] = useState(generateField());
  const [userFigure, setUserFigure] = useState();
  const [pcFigure, setPcFigure] = useState();
  const [nextGameSettings, setNextGameSettings] = useState(firstGameSettings);

  function startGame() {
    setField(generateField());
    if (
      (nextGameSettings.isUserFirst &&
        nextGameSettings.firstFigure === FIGURES.CROSS) ||
      (!nextGameSettings.isUserFirst &&
        nextGameSettings.firstFigure === FIGURES.ZERO)
    ) {
      setUserFigure(FIGURES.CROSS);
      setPcFigure(FIGURES.ZERO);
    } else {
      setUserFigure(FIGURES.ZERO);
      setPcFigure(FIGURES.CROSS);
    }
    if (!nextGameSettings.isUserFirst)
      firstPcStep(nextGameSettings.firstFigure);
  }

  const firstPcStep = (pcFigure) => updateField(1, 1, pcFigure);

  function updateField(i, j, value) {
    let newField = [];
    newField = Object.assign(newField, field);
    newField[i][j] = value;
    setField(newField);
  }

  function userStep(i, j) {
    // if (!userFigure && !pcFigure) return;
    updateField(i, j, userFigure);
    if (isGameEnd()) return;
    stepPC();
  }

  function stepPC() {
    // проверка главной диагонали
    if (!field[0][0] && (field[1][1] === field[2][2]) === userFigure) {
      updateField(0, 0, pcFigure);
      return;
    }
    if (!field[1][1] && (field[0][0] === field[2][2]) === userFigure) {
      updateField(1, 1, pcFigure);
      return;
    }
    if (!field[2][2] && (field[1][1] === field[0][0]) === userFigure) {
      updateField(2, 2, pcFigure);
      return;
    }
    // проверка вторичной диагонали
    if (!field[0][2] && (field[1][1] === field[2][2]) === userFigure) {
      updateField(0, 2, pcFigure);
      return;
    }
    if (!field[1][1] && (field[0][2] === field[2][0]) === userFigure) {
      updateField(1, 1, pcFigure);
      return;
    }
    if (!field[2][0] && (field[1][1] === field[0][2]) === userFigure) {
      updateField(2, 0, pcFigure);
      return;
    }

    // проверка первой строки
    if (!field[0][0] && (field[0][1] === field[0][2]) === userFigure) {
      updateField(0, 0, pcFigure);
      return;
    }
    if (!field[0][1] && (field[0][0] === field[0][2]) === userFigure) {
      updateField(0, 1, pcFigure);
      return;
    }
    if (!field[0][2] && (field[0][0] === field[0][1]) === userFigure) {
      updateField(0, 2, pcFigure);
      return;
    }
    // проверка второй строки
    if (!field[1][0] && (field[1][1] === field[1][2]) === userFigure) {
      updateField(1, 0, pcFigure);
      return;
    }
    if (!field[1][1] && (field[1][0] === field[1][2]) === userFigure) {
      updateField(1, 1, pcFigure);
      return;
    }
    if (!field[1][2] && (field[1][0] === field[1][1]) === userFigure) {
      updateField(1, 2, pcFigure);
      return;
    }
    // проверка третьей строки
    if (!field[2][0] && (field[2][1] === field[2][2]) === userFigure) {
      updateField(2, 0, pcFigure);
      return;
    }
    if (!field[2][1] && (field[2][0] === field[2][2]) === userFigure) {
      updateField(2, 1, pcFigure);
      return;
    }
    if (!field[2][2] && (field[2][0] === field[2][1]) === userFigure) {
      updateField(2, 2, pcFigure);
      return;
    }
    // проверка первого столбца
    if (!field[0][0] && (field[1][0] === field[2][0]) === userFigure) {
      updateField(0, 0, pcFigure);
      return;
    }
    if (!field[1][0] && (field[0][0] === field[2][0]) === userFigure) {
      updateField(1, 0, pcFigure);
      return;
    }
    // проверка третьего столбца
    if (!field[0][2] && (field[1][2] === field[2][2]) === userFigure) {
      updateField(0, 2, pcFigure);
      return;
    }
    if (!field[1][2] && (field[0][2] === field[2][2]) === userFigure) {
      updateField(1, 2, pcFigure);
      return;
    }
    if (!field[2][2] && (field[0][2] === field[1][2]) === userFigure) {
      updateField(2, 2, pcFigure);
      return;
    }
    // if (findCrossing()) {
    //   const ij = findCrossing();
    //   updateField(ij.i, ij.j, pcFigure);
    //   return;
    // }
    // ищем потенциальные пересечения

    randomStep();
    return;
  }
  function findCrossing() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // i=0;j=0
        if (
          (field[i][0] === userFigure ||
            field[i][1] === userFigure ||
            field[i][2] === userFigure) &&
          (field[0][j] === userFigure ||
            field[1][j] === userFigure ||
            field[2][j] === userFigure)
        ) {
          console.log(i, j);
          return { i, j };
        }
      }
    }
    return false;
  }
  function randomStep() {
    let i, j;
    do {
      i = getRandomInt();
      j = getRandomInt();
    } while (field[i][j]);
    console.log("randomStep", i, j);
    updateField(i, j, pcFigure);
  }

  const getRandomInt = () => Math.floor(Math.random() * field[0].length);

  function isGameEnd() {
    const countEptyCell = field.flat().filter((cell) => !cell).length;
    if (countEptyCell === 0) {
      alert.log("Конец игры");
      return true;
    }
  }

  const handleChangeFigure = (event) => {
    nextGameSettings.firstFigure = event.target.value;
    setNextGameSettings(Object.assign({}, nextGameSettings));
  };

  const handleChangeFirstStep = (event) => {
    nextGameSettings.isUserFirst = event.target.value;
    setNextGameSettings(Object.assign({}, nextGameSettings));
  };

  return (
    <div className="app">
      <div className="app__config">
        <FormControl className="form-control-group" fullWidth>
          <InputLabel id="is-cross-first-label">Первый ход за</InputLabel>
          <Select
            labelId="is-cross-first-label"
            id="is-cross-first-select"
            value={nextGameSettings.firstFigure}
            label="Первый ход за"
            onChange={handleChangeFigure}
          >
            <MenuItem value={FIGURES.CROSS}>X</MenuItem>
            <MenuItem value={FIGURES.ZERO}>O</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="form-control-group" fullWidth>
          <InputLabel id="user-is-cross-label">
            Первый ход за человеком?
          </InputLabel>
          <Select
            labelId="user-is-cross-label"
            id="user-is-cross-select"
            value={nextGameSettings.isUserFirst}
            label="Играем за "
            onChange={handleChangeFirstStep}
          >
            <MenuItem value={true}>Да</MenuItem>
            <MenuItem value={false}>Нет</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" onClick={startGame}>
          Начать игру!
        </Button>
      </div>
      <Field className="app__field" field={field} userStep={userStep} />
    </div>
  );
}

export default App;
