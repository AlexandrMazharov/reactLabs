export default function getBestStep(userFigure, pcFigure, field) {
  if (!userFigure && !pcFigure) return;
  // проверка главной диагонали
  if (
    !field[0][0] &&
    field[1][1] === field[2][2] &&
    field[2][2] === userFigure
  ) {
    return { i: 0, j: 0, value: pcFigure };
  }
  if (
    !field[1][1] &&
    field[0][0] === field[2][2] &&
    field[2][2] === userFigure
  ) {
    return { i: 1, j: 1, value: pcFigure };
  }
  if (
    !field[2][2] &&
    field[1][1] === field[0][0] &&
    field[0][0] === userFigure
  ) {
    return { i: 2, j: 2, value: pcFigure };
  }

  if (
    field[1][1] &&
    field[0][0] === field[2][2] &&
    field[0][0] === userFigure
  ) {
    if (!field[0][2]) return { i: 0, j: 2, value: pcFigure };
    if (!field[2][0]) return { i: 2, j: 0, value: pcFigure };
  }

  // проверка вторичной диагонали
  // TODO: 02 пусто, 11,20 крестики, добавить проверку на
  if (
    !field[0][2] &&
    field[1][1] === field[2][2] &&
    field[2][2] === userFigure
  ) {
    return { i: 0, j: 2, value: pcFigure };
  }
  if (
    !field[1][1] &&
    field[0][2] === field[2][0] &&
    field[2][0] === userFigure
  ) {
    return { i: 1, j: 1, value: pcFigure };
  }
  if (
    !field[2][0] &&
    field[1][1] === field[0][2] &&
    field[0][2] === userFigure
  ) {
    return { i: 2, j: 0, value: pcFigure };
  }

  // проверка первой строки
  if (
    !field[0][0] &&
    field[0][1] === field[0][2] &&
    field[0][2] === userFigure
  ) {
    return { i: 0, j: 0, value: pcFigure };
  }
  if (
    !field[0][1] &&
    field[0][0] === field[0][2] &&
    field[0][2] === userFigure
  ) {
    return { i: 0, j: 1, value: pcFigure };
  }
  if (
    !field[0][2] &&
    field[0][0] === field[0][1] &&
    field[0][1] === userFigure
  ) {
    return { i: 0, j: 2, value: pcFigure };
  }
  // проверка второй строки
  if (
    !field[1][0] &&
    field[1][1] === field[1][2] &&
    field[1][2] === userFigure
  ) {
    return { i: 1, j: 0, value: pcFigure };
  }
  if (
    !field[1][1] &&
    field[1][0] === field[1][2] &&
    field[1][2] === userFigure
  ) {
    return { i: 1, j: 1, value: pcFigure };
  }
  if (
    !field[1][2] &&
    field[1][0] === field[1][1] &&
    field[1][1] === userFigure
  ) {
    return { i: 1, j: 2, value: pcFigure };
  }
  // проверка третьей строки
  if (
    !field[2][0] &&
    field[2][1] === field[2][2] &&
    field[2][2] === userFigure
  ) {
    return { i: 2, j: 0, value: pcFigure };
  }
  if (
    !field[2][1] &&
    field[2][0] === field[2][2] &&
    field[2][2] === userFigure
  ) {
    return { i: 2, j: 1, value: pcFigure };
  }
  if (
    !field[2][2] &&
    field[2][0] === field[2][1] &&
    field[2][1] === userFigure
  ) {
    return { i: 2, j: 2, value: pcFigure };
  }
  // проверка первого столбца
  if (
    !field[0][0] &&
    field[1][0] === field[2][0] &&
    field[2][0] === userFigure
  ) {
    return { i: 0, j: 0, value: pcFigure };
  }
  if (
    !field[1][0] &&
    field[0][0] === field[2][0] &&
    field[2][0] === userFigure
  ) {
    return { i: 1, j: 0, value: pcFigure };
  }
  if (
    !field[2][0] &&
    field[0][0] === field[1][0] &&
    field[1][0] === userFigure
  ) {
    return { i: 2, j: 0, value: pcFigure };
  }
  // проверка второго столбца
  if (
    !field[0][1] &&
    field[1][1] === field[2][1] &&
    field[2][1] === userFigure
  ) {
    return { i: 0, j: 1, value: pcFigure };
  }
  if (
    !field[1][1] &&
    field[0][1] === field[2][1] &&
    field[2][1] === userFigure
  ) {
    return { i: 1, j: 1, value: pcFigure };
  }
  if (
    !field[2][1] &&
    field[0][1] === field[1][1] &&
    field[1][1] === userFigure
  ) {
    return { i: 2, j: 1, value: pcFigure };
  }
  // проверка третьего столбца
  if (
    !field[0][2] &&
    field[1][2] === field[2][2] &&
    field[2][2] === userFigure
  ) {
    return { i: 0, j: 2, value: pcFigure };
  }
  if (
    !field[1][2] &&
    field[0][2] === field[2][2] &&
    field[2][2] === userFigure
  ) {
    return { i: 1, j: 2, value: pcFigure };
  }
  if (
    !field[2][2] &&
    field[0][2] === field[1][2] &&
    field[1][2] === userFigure
  ) {
    return { i: 2, j: 2, value: pcFigure };
  }
  // ищем потенциальные вилки
  // const ij = findCrossing(field, userFigure);
  // if (ij) {
  //   return { i: ij.i, j: ij.j, value: pcFigure };
  // }
  // если центр свободен, то занять центр
  if(!field[1][1]) return { i: 1, j: 1, value: pcFigure }

  return randomStep(field, pcFigure);
}
function randomStep(field, pcFigure) {
  let i, j;
  do {
    i = getRandomInt();
    j = getRandomInt();
  } while (field[i][j]);
  console.log("randomStep", i, j);
  return { i, j, value: pcFigure };
}
function findCrossing(field, userFigure) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        !field[i][j] &&
        isRowContainFigure(field, i, userFigure) &&
        isColContainFigure(field, j, userFigure)
      ) {
        return { i, j };
      }
    }
  }
  return false;
}
function isRowContainFigure(field, i, figure) {
  for (let j = 0; j < 3; j++) {
    if (field[i][j] === figure) return { i, j };
  }
  return null;
}
function isColContainFigure(field, j, figure) {
  for (let i = 0; i < 3; i++) {
    if (field[i][j] === figure) return { i, j };
  }
  return null;
}
const getRandomInt = () => Math.floor(Math.random() * 3);
