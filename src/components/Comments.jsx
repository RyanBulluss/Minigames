import React, { useEffect } from "react";
import { useState } from "react";
import { createComment, getAllComments } from "../utilities/comments";

const Comments = ({ currentGame, user }) => {
  // const [comment, setComment] = useState("");
  // const [comments, setComments] = useState([]);

  // function handleChange(e) {
  //   e.preventDefault();
  //   setComment((c) => e.target.value);
  // }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const newComment = await createComment(currentGame, user, comment);
  //   getComments();
  //   setComment("");
  // }

  // useEffect(() => {
  //   getComments();
  // }, [currentGame]);
  
  // async function getComments() {
  //   if (!currentGame) return;
  //   const arr = await getAllComments(currentGame);
  //   setComments(arr.reverse())
  // } 

  return (
    <>
      {/* {currentGame && (
        <div className="bg-first w-full my-4 p-2">
          <form onSubmit={(e) => handleSubmit(e)} className="flex gap-2">
            <input
              name="comment"
              type="text"
              cols="50"
              rows="1"
              style={{ resize: "none", color: "black" }}
              className="py-1 px-3 rounded-lg"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => handleChange(e)}
            ></input>
            <button className="bg-third rounded-lg px-3 py-1" type="submit">
              {">"}
            </button>
          </form>
          {comments.map((com, idx) => (
            <div key={idx}>{com.user.name} | {com.text} | {new Date(com.createdAt).toLocaleDateString()} {new Date(com.createdAt).toLocaleTimeString()}</div>
          ))}
        </div>
      )} */}
    </>
  );
};

export default Comments;
