import React, { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import "./Global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Search";
import SearchResult from "./components/SearchResult";
import Information from "./components/Information";
import TodoList from "./components/TodoList";
import Home from "./components/Home";
import UserPosts from "./components/UserPosts";
import Albums from "./components/Albums";
import ViewAlbum from "./components/ViewAlbum";

function App() {
  const [disabled, setDisabled] = useState("disabled");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  function selectUser(userId) {
    setSelectedUserId(userId);
    setDisabled("");
  }

  async function getData(searchText) {
    const url = `https://my-json-server.typicode.com/AlexandrMazharov/reactLabs/lab2/users?name_like=${searchText}`;
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      setUsers(json);
    } else alert("Ошибка HTTP: " + response.status);
  }

  return (
    <div className="card app">
      <div className="card-body row">
        <section className="app__menu col-3">
          <Search getText={getData} />
          <SearchResult selectUser={selectUser} users={users} />
        </section>
        <section className="app__main col">
          <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${disabled}`}
                        to={"/info/" + selectedUserId}
                      >
                        Подробная информация
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${disabled}`}
                        to={"/posts/" + selectedUserId}
                      >
                        Посты
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${disabled}`}
                        to={"/todo/" + selectedUserId}
                      >
                        Список дел
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${disabled}`}
                        to={"/albums/" + selectedUserId}
                      >
                        Альбомы
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="/todo" element={<TodoList />}>
                  <Route path=":userId" element={<TodoList />} />
                </Route>
                <Route path="posts" element={<UserPosts />}>
                  <Route path=":userId" element={<UserPosts />} />
                </Route>
                <Route path="/info" element={<Information />}>
                  <Route path=":userId" element={<Information />} />
                </Route>
                <Route path="/albums" element={<Albums />}>
                  <Route path=":userId" element={<Albums />} />
                </Route>
                <Route path="/view-album" element={<ViewAlbum />}>
                  <Route path=":id" element={<ViewAlbum />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </section>
      </div>
    </div>
  );
}

export default App;
