import React, { useState, useEffect } from "react";
import * as bootstrap from "bootstrap";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
export default function UserPosts(props) {
  const [posts, setPosts] = useState([]);
  const userId = useParams().userId;

  const url = `https://my-json-server.typicode.com/AlexandrMazharov/reactLabs/lab2/posts?userId=${userId}`;
  async function getPostsByid() {
    const response = await fetch(url);
    const res = await response.json(response);
    setPosts(res);
  }

  useEffect(() => getPostsByid(), []);

  return (
    <div className="posts">
      {posts?.map((post) => {
        return (
          <div className="posts__post card" key={post.id}>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
              <div>
                <p>
                  <a
                    class="btn btn-link"
                    data-bs-toggle="collapse"
                    href={`#post${post.id}`}
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Коментарии
                  </a>
                </p>
                <div class="collapse" id={`post${post.id}`}>
                  <Comments comments={post.comments} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
