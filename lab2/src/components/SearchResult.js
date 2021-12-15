import React from "react";
export default function SearchResult(props) {
  return (
    <div>
      {props.users.map((item) => (
        <button
          type="button"
          className="btn btn-light w-100"
          onClick={props.selectUser.bind(this, item.id)}
          key={item.id}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
