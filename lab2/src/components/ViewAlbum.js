import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Global.css";
export default function Albums(props) {
  const [photos, setPhotos] = useState([]);
  const albomId = useParams.albumId;
  const url = `https://my-json-server.typicode.com/AlexandrMazharov/reactLabs/lab2/photo?albomId=${albomId}`;

  async function getAlbomsByUserId() {
    const response = await fetch(url);
    const result = await response.json(response);
    setPhotos(result);
  }
  useEffect(() => getAlbomsByUserId(), []);

  return (
    <div className="card galary ">
      {photos?.map((photo) => {
        return <img className="galary__photo" src={photo.url} alt="photo" />;
      })}
    </div>
  );
}
