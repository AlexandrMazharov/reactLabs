import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Information(props) {
  const [info, setInfo] = useState({});
  const userId = useParams().userId;

  const url = `https://my-json-server.typicode.com/AlexandrMazharov/reactLabs/lab2/users?id=${userId}`;
  async function getInfoByid() {
    const response = await fetch(url).then((response) =>
      response.json(response)
    );
    setInfo(response[0]);
  }

  useEffect(() => getInfoByid(), []);

  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Name: {info.name}</li>
        <li className="list-group-item">Username: {info.username}</li>
        <li className="list-group-item">Email: {info.email}</li>
        <li className="list-group-item">Phone: {info.phone}</li>
        <li className="list-group-item">WebSite: {info.website}</li>
        <li className="list-group-item">
          Adress: {info.address?.city}, {info.address?.street}{" "}
          {info.address?.suite} ({info.address?.zipcode}), lat:{" "}
          {info.address?.geo.lat} lng: {info.address?.geo.lng}{" "}
        </li>
        <li className="list-group-item">
          Company: {info.company?.name}, {info.company?.catchPhrase},{" "}
          {info.company?.bs}{" "}
        </li>
      </ul>
    </div>
  );
}
