import React, { useState } from "react";
import "./../Global.css";

export default function Search(props) {
  const search = () => props.getText(searchText);
  const [searchText, setCount] = useState("");
  return (
    <div className="search">
      <input
        onChange={(event) => setCount(event.currentTarget.value)}
        className="search__input form-control form-control-sm"
        type="text"
        placeholder="Кого ищем?"
        aria-label="default input example"
      ></input>
      <button
        type="button"
        className=" search__btn btn btn-primary"
        onClick={search}
      >
        Найти
      </button>
    </div>
  );
}
