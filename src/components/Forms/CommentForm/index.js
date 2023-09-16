import { useState } from "react";
import { useDispatch } from "react-redux";

import { addComment } from "../../../reducers/bookingsReducers";

const Comment = ({ singleBooking }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentObj = {
      ...singleBooking,
      comments: singleBooking.comments.concat(comment),
    };

    dispatch(addComment(singleBooking.id, commentObj));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Add comment</label>
        </div>
        <div>
          <textarea
            name="comment"
            value={comment}
            rows="4"
            cols="30"
            type="text"
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Comment;
