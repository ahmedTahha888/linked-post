
import { useContext, useState } from "react";
import { FaEllipsisH, FaPen, FaTrashAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { authContext } from "../../Context/AuthContext";

const AllComment = ({ postComments, postId }) => {
  const { user } = useContext(authContext);

  const [activeCommentId, setActiveCommentId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const queryClient = useQueryClient();

  //  mutation
  const { mutate: updateComment, isPending } = useMutation({
    mutationFn: ({ postId, commentId, content }) => {
      return axios.put(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
        { content },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["postComments"]);
      setEditingCommentId(null);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const toggleOptions = (id) => {
    setActiveCommentId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.content);
    setActiveCommentId(null);
  };

  const handleSave = (commentId) => {
    updateComment({
      postId,
      commentId,
      content: editText,
    });
  };

  const handleCancel = () => {
    setEditingCommentId(null);
  };

  return (
    <>
      {postComments?.map((comment) => {
        const isEditing = editingCommentId === comment._id;

        return (
          <div key={comment._id} className="space-y-2">
            <div className="relative flex items-start gap-2">
              <img
                className="mt-0.5 h-8 w-8 rounded-full object-cover"
                src={comment?.commentCreator?.photo}
                alt={comment?.commentCreator?.name}
              />

              <div className="min-w-0 flex-1">
                <div className="relative inline-block max-w-full rounded-2xl bg-[#f0f2f5] px-3 py-2">
                  <p className="text-xs font-bold text-slate-900">
                    {comment?.commentCreator?.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {comment?.commentCreator?.username}
                  </p>

                  {/*  Edit Mode */}
                  {isEditing ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="border rounded-full px-3 py-1 text-sm w-full outline-none"
                      />

                      <button
                        onClick={() => handleSave(comment._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs"
                      >
                        {isPending ? "Saving..." : "Save"}
                      </button>

                      <button
                        onClick={handleCancel}
                        className="text-gray-500 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
                      {comment?.content}
                    </p>
                  )}
                </div>

                <div className="mt-1.5 flex items-center justify-between px-1">
                  <div className="flex items-center gap-4">
                    <button className="text-xs font-semibold text-slate-500 hover:underline">
                      Like ({comment?.likesCount || 0})
                    </button>

                    <button className="text-xs font-semibold text-slate-500 hover:text-[#1877f2] hover:underline">
                      Reply
                    </button>
                  </div>
                </div>
              </div>

              {/* Options */}
              {user?.user === comment?.commentCreator?._id && (
                <div className="relative">
                  <span
                    className="cursor-pointer"
                    onClick={() => toggleOptions(comment._id)}
                  >
                    <FaEllipsisH />
                  </span>

                  <div
                    className={`absolute end-10 top-5 bg-white shadow rounded-xl border border-gray-300 flex flex-col gap-2 text-sm ${
                      activeCommentId !== comment._id && "hidden"
                    }`}
                  >
                    <button
                      onClick={() => handleEdit(comment)}
                      className="text-gray-600 cursor-pointer flex gap-2 items-center w-full text-start hover:bg-gray-200 py-2 px-3 rounded"
                    >
                      <FaPen />
                      <span>Edit</span>
                    </button>

                    <button className="text-red-600 flex gap-2 items-center cursor-pointer hover:bg-red-100 py-2 px-3 rounded">
                      <FaTrashAlt />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AllComment;
