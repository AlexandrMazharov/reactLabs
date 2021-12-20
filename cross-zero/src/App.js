import "./Global.css";
import getBestStep from "./II";
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
    if (!userFigure && !pcFigure) return;
    updateField(i, j, userFigure);
    if (isGameEnd()) return;
    stepPC();
  }

  function stepPC() {
    if (!userFigure && !pcFigure) return;
    const bestStep = getBestStep(userFigure, pcFigure, field);
    updateField(bestStep.i, bestStep.j, pcFigure);
  }
  function isFigureWin(figure) {
    if (
      // проверка строк
      (field[0][0] === field[0][1]) === (field[0][2] === figure) ||
      (field[1][0] === field[1][1]) === (field[1][2] === figure) ||
      (field[2][0] === field[2][1]) === (field[2][2] === figure) ||
      // проверка столбов
      (field[0][0] === field[1][0]) === (field[2][0] === figure) ||
      (field[0][1] === field[1][1]) === (field[2][1] === figure) ||
      (field[0][2] === field[1][2]) === (field[2][2] === figure) ||
      // проверка диагоналей
      (field[0][0] === field[1][1]) === (field[2][2] === figure) ||
      (field[0][2] === field[1][1]) === (field[2][0] === figure)
    ) {
      return true;
    }
  }
  function isGameEnd() {
    const countEptyCell = field.flat().filter((cell) => !cell).length;
    if (countEptyCell === 0) {
      if (isFigureWin(FIGURES.CROSS)) alert("Победа за Крестиком");
      else if (isFigureWin(FIGURES.ZERO)) alert("Победа за Ноликом");
      else alert("Ничья");

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
