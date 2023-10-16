import React, { useState } from "react";
import "./comments.css";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment) {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: prevComments.length + 1,
          postId: postId,
          name: "User",
          body: newComment,
        },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="comment">
            <strong>{comment.name}:</strong> {comment.body}
          </li>
        ))}
      </ul>
      <div className="comment">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default Comments;
