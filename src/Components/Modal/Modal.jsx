



import React, { useState } from "react";
import { Button } from "@heroui/react";
import { GoImage } from "react-icons/go";
import { CiFaceSmile } from "react-icons/ci";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Modal = ({ post, closeModal }) => {
  const [text, setText] = useState(post?.body || "");
  const queryClient = useQueryClient();

  // ================= update post =================
  const { mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success("Post Updated Successfully");
      queryClient.invalidateQueries(["getAllPosts"]);
      queryClient.invalidateQueries(["getMyProfile"]);
      closeModal();
    },
    onError: () => {
      toast.error("Error updating post");
    },
  });

  function updatePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${post._id}`,
      { body: text },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  return (
    <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      
      {/* close */}
      <button
        onClick={closeModal}
        className="mb-3 text-sm text-red-500"
      >
        Close
      </button>

      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] outline-none"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
            <GoImage />
            <input type="file" className="hidden" />
          </label>

          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
            <CiFaceSmile />
          </button>
        </div>

        <Button
          onClick ={mutate}
          className="bg-blue-500"
        >
          {isPending ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
};

export default Modal;
