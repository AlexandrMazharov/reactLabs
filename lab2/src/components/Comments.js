import React from "react";
export default function Comments(props) {
  const comments = props.comments;

  return (
    <div className="comments">
      {comments &&
        comments.map((comment) => {
          return (
            <p key={comment.id} className="comment">
              <span className="comment__name">{comment.name}</span>
              <span className="comment__email">({comment.email})</span>
              <span className="comment__body">{comment.body}</span>
            </p>
          );
        })}
      {!comments && <p>Комментариев пока нет</p>}
    </div>
  );
}
