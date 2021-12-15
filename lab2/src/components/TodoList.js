import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Global.css";

export default function TodoList(props) {
  const [todoList, setTodoList] = useState([]);
  const userId = useParams().userId;

  const url = `https://my-json-server.typicode.com/AlexandrMazharov/reactLabs/lab2/todo?userId=${userId}`;
  async function getTodoByUserId() {
    const response = await fetch(url);
    const res = await response.json(response);
    setTodoList(res);
  }
  useEffect(() => getTodoByUserId(), []);

  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        {todoList?.map((element) => {
          return element.completed ? (
            <li key={element.title} className="list-group-item  completed">
              {element.title}
            </li>
          ) : (
            <li key={element.title} className="list-group-item">
              {element.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
