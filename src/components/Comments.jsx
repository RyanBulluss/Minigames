import React from "react";
import { useState } from "react";

const Comments = ({ currentGame }) => {
  const [comment, setComment] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setComment((c) => e.target.value);
  }

  return (
    <>
      {currentGame && (
        <div className="bg-first w-full h-20 my-4 p-2">
          <form action="" className="flex gap-2">
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
            {comment}
          </form>
        </div>
      )}
    </>
  );
};

export default Comments;
