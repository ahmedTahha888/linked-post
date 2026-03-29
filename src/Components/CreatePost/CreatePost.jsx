import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiFaceSmile } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import { GoImage } from "react-icons/go";
import { IoEarthOutline } from "react-icons/io5";

export default function CreatePost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [imageScr, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const CreatingPost = (formdata) => {
    return axios.post(`https://route-posts.routemisr.com/posts`, formdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };
  const { mutate } = useMutation({
    mutationKey: ["CreatePost"],
    mutationFn: CreatingPost,
    onMutate: () => {
     setLoading(true);
     
    },
    onSuccess: () => {
      toast.success("Post Add Successfully");
      setLoading(false)
      clr()
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {
        setLoading(false)
      toast.error("there Is An Error");
    },
  });

  function handleChange(e) {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    if (file) {
      setImageSrc(URL.createObjectURL(file));
      setImage(file);
    }
  }
  function handleAddPost() {
    const formdata = new FormData();
    if (body) {
      formdata.append("body", body);
    }
    if (image) {
      formdata.append("image", image);
    }
    mutate(formdata);
  }

  function clr (){
    setBody("")
    setImage(null)
    setImageSrc("")
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start gap-3">
        <img
          src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-Transparent.png"
          className="h-11 w-11 rounded-full object-cover"
          alt=""
        />
        <div className="flex-1">
          <p className="text-base font-extrabold text-slate-900">Ahmed Taha</p>
          <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
            <span>
              <IoEarthOutline />
            </span>
            <select className="bg-transparent outline-none">
              <option value="public">Public</option>
              <option value="followers">Followers</option>
              <option value="only_me">Only me</option>
            </select>
          </div>
        </div>
      </div>

      <div className="relative">
        <textarea
          onChange={(e) => setBody(e.target.value)}
          rows="4"
          value={body}
          placeholder="What's on your mind ?"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
        ></textarea>
      </div>
      <img src={imageScr} alt="" />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
        <div className="relative flex items-center gap-2">
          <label
            htmlFor="photo"
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            <span className="text-emerald-600 text-xl">
              <GoImage />
            </span>
            <span className="hidden sm:inline">Photo/video</span>
            <input
              onChange={handleChange}
              type="file"
              accept="image/*"
              className="hidden"
              id="photo"
            />
          </label>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            <span className="text-amber-500">
              <CiFaceSmile />
            </span>
            <span className="hidden sm:inline">Feeling/activity</span>
          </button>
        </div>
        <div className="flex items-center gap-3">


          {loading ? (
            <button
              onClick={handleAddPost}
              className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60"
            >
              Posting...
              <span>
                <FiSend />
              </span>
            </button>
          ) : (
            <button
              onClick={handleAddPost}
              className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] disabled:opacity-60"
            >
              Post
              <span>
                <FiSend />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
