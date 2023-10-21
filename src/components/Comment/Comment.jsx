import api from "@/api/api";
import { format } from "date-fns";
import jwt_decode from "jwt-decode";
import React from "react";
import toast from "react-hot-toast";

const Comment = ({ comments, postId, token, fetchPost }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = jwt_decode(token);
      const userId = user?.user_id;
      const { comment } = e.target;
      const response = await api.post(
        "/blog/comments/",
        {
          post: postId,
          text: comment.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const status = await response.status;
      const result = await response.data;
      if (status === 201) {
        fetchPost();
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
      comment.value = "";
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: "1" });
    }
  };
  return (
    <div className="mt-8">
      <h1 className="text-xl font-semibold">Comments</h1>
      {token && (
        <form onSubmit={handleSubmit} method="POST">
          <textarea
            name="comment"
            id="comment"
            rows="3"
            className="border  text-sm w-full rounded-md focus:outline-none p-2"
          ></textarea>
          <div className="flex justify-end ml-auto">
            <button
              type="submit"
              className="btn-gradient py-1.5 rounded-md  px-4"
            >
              Comment
            </button>
          </div>
        </form>
      )}

      {comments?.reverse().map((comment) => (
        <div class="mx-auto my-3  rounded-xl border p-3 text-gray-700">
          <div class="">
            <div class="flex items-center">
              <div class="h-10 w-10 rounded-full flex items-center justify-center mr-2 bg-gray-950 text-white">
                {comment?.user?.email.slice(0, 1).toUpperCase()}
              </div>

              <div class="flex items-center justify-between w-full">
                <p class="block font-semibold text-gray-700 uppercase">
                  {comment?.user?.email}
                </p>
                <p class="truncate text-sm text-gray-400">
                  {format(new Date(comment.created_at), "dd MMM, yyyy")}
                </p>
              </div>
            </div>
            <div className="ml-12">
              <p class="capitalize text-sm">{comment?.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
