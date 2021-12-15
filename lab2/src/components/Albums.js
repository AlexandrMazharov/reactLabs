import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Albums(props) {
  const [albums, setAlbums] = useState([]);
  const userId = useParams().userId;
  const navigate = useNavigate();

  const url = `https://my-json-server.typicode.com/AlexandrMazharov/ForMisha/albums?userId=${userId}`;
  async function getAlbomsByUserId() {
    const response = await fetch(url);
    const result = await response.json(response);
    setAlbums(result);
  }

  useEffect(() => getAlbomsByUserId(), []);

  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        {albums?.map((albom) => {
          return (
            <li
              key={albom.id}
              className="list-group-item"
              onClick={() => navigate(`/view-album/albumId=${albom.albumId}`)}
            >
              {albom.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
