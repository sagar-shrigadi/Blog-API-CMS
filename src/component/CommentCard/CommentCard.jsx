import { useOutletContext } from "react-router";
import { DateOptionsWEx, locales } from "../../Helper/DateOptions";
import { deleteComment } from "../../service/comment/DeleteComment";
import { DivWrapper } from "../Forms/DivWrapper";
import { useRef, useState } from "react";
import { editComment } from "../../service/comment/EditComment";

export const CommentCard = ({ comment, setRefreshToggle }) => {
  const { token, user } = useOutletContext();
  // console.log("token value", token);
  const [message, setMessage] = useState(comment.message);
  const popoverRef = useRef(null);
  const uniqueAnchorNameDelete = `--btn-${comment.id}`;
  const uniquePopoverIdDelete = `--moreActions-${comment.id}`;
  const uniqueAnchorNameEdit = `--btnEdit-${comment.id}`;
  const uniquePopoverIdEdit = `--moreActionsEdit-${comment.id}`;

  const handleCommentEdit = async (e, commentId) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to edit this comment?")) {
      return;
    }
    try {
      const response = await editComment(token, commentId, message);
      console.log("server response for edit comment", response);
      setRefreshToggle((prev) => !prev);
      if (popoverRef.current) {
        popoverRef.current.hidePopover();
      }
    } catch (error) {
      console.error("edit commit error", error);
    }
  };

  const handleCommentDelete = async (e, commentId) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    try {
      const response = await deleteComment(token, commentId);
      console.log(response);
      setRefreshToggle((prev) => !prev);
    } catch (error) {
      console.error("Delete Comment", error);
    }
  };
  return (
    <article className="flex flex-col gap-2 border rounded px-2 py-1 md:px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-4">
          <h3 className="text-xl md:text-2xl font-bold">
            {comment.author.username}
          </h3>
          <p className="text-sm sm:text-base">
            {new Date(comment.createdAt).toLocaleDateString(
              locales,
              DateOptionsWEx,
            )}
          </p>
        </div>
        {user?.admin ? (
          <button
            popoverTarget={uniquePopoverIdDelete}
            style={{ anchorName: uniqueAnchorNameDelete }}
            className="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-4 md:w-5"
            >
              {/* !Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
              <path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
            </svg>
          </button>
        ) : (
          ""
        )}
        <div
          popover="auto"
          id={uniquePopoverIdDelete}
          style={{ positionAnchor: uniqueAnchorNameDelete }}
          className="absolute [position-area:top_left] m-0 mb-4 min-h-25 bg-white px-6 py-3 border rounded shadow-md text-xl"
        >
          <div className="mb-4 border-b-2">
            <button
              popoverTarget={uniquePopoverIdEdit}
              style={{ anchorName: uniqueAnchorNameEdit }}
              className="cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div
            popover="auto"
            id={uniquePopoverIdEdit}
            ref={popoverRef}
            style={{ positionAnchor: uniqueAnchorNameEdit }}
            className="m-auto p-4 bg-amber-50"
          >
            <div className="flex flex-col justify-between items-center gap-2 z-10">
              <button
                popoverTarget={uniquePopoverIdEdit}
                popoverTargetAction="hide"
                className="self-end cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-7"
                >
                  {/* !Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
                  <path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z" />
                </svg>
              </button>
              <h2 className="text-2xl self-start mb-3">Edit Comment</h2>
            </div>
            <form
              className="grow flex flex-col justify-between gap-8"
              onSubmit={(e) => handleCommentEdit(e, comment.id)}
            >
              <DivWrapper>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border rounded-md text-base p-2"
                  rows="5"
                  autoFocus
                ></textarea>
              </DivWrapper>
              <button
                type="submit"
                className="border p-1 rounded text-xl cursor-pointer mb-2"
              >
                Edit
              </button>
            </form>
          </div>
          <form
            onSubmit={(e) => handleCommentDelete(e, comment.id)}
            className="border-b-2"
          >
            <button className="cursor-pointer">Delete</button>
          </form>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-base md:text-lg text-pretty max-w-[55ch]">
          {comment.message}
        </p>
      </div>
    </article>
  );
};
