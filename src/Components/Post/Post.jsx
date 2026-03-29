import React, { useContext, useState } from "react";
import { BsShare } from "react-icons/bs";
import { CiBookmark, CiRepeat } from "react-icons/ci";
import { FaEllipsisH, FaRegTrashAlt } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { IoChevronDownOutline, IoEarthOutline } from "react-icons/io5";
import { LuLock } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import { VscThumbsup } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import dayjs from "dayjs";
import { authContext } from "../../Context/AuthContext";
import { GoPencil } from "react-icons/go";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AddComment from "../AddComment/AddComment";
import Modal from "../Modal/Modal";

const Post = ({ post, id, isPostDetails }) => {
  const { user } = useContext(authContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openEllipsis, setOpenEllipsis] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const toggleEllipsis = () => {
    setOpenEllipsis(!openEllipsis);
  };
  const queryClient = useQueryClient();

  // ============================== delete post ===============================
  const { mutate, isPending } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post Deleted Successfully");
      queryClient.invalidateQueries(["getAllPosts"]);
      queryClient.invalidateQueries(["getMyProfile"]);
    },
    onError: () => {
      toast.error("there Is An Error");
    },
  });

  function deletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  // ============================= like post ===============================
  const { mutate: likePostMutation, isPending: likePostPending } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllPosts"]);
      queryClient.invalidateQueries(["getMyProfile"]);
    },
    onError: () => {
      toast.error("there Is An Error");
    },
  });

  function likePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  function formatTime(date) {
    const now = dayjs();
    const diffInSeconds = now.diff(dayjs(date), "second");

    if (diffInSeconds < 60) return `${diffInSeconds}s`;

    const diffInMinutes = now.diff(dayjs(date), "minute");
    if (diffInMinutes < 60) return `${diffInMinutes}m`;

    const diffInHours = now.diff(dayjs(date), "hour");
    if (diffInHours < 24) return `${diffInHours}h`;

    const diffInDays = now.diff(dayjs(date), "day");
    return `${diffInDays}d`;
  }

  return (
    <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* post header */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Link to="/profile" className="shrink-0">
            <img
              src={post.user?.photo}
              className="h-11 w-11 rounded-full object-cover"
              alt={post.user.name}
            />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1 text-sm">
              <Link
                className="font-extrabold text-foreground hover:underline"
                to="/profile"
                data-discover="true"
              >
                {post.user.name}
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              <button
                type="button"
                className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline"
              >
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </button>
              <span className="mx-1">.</span>
              <span className="relative inline-flex items-center">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>
                    <IoEarthOutline />
                  </span>
                  <span>Public</span>
                  <span onClick={toggleMenu}>
                    <IoChevronDownOutline />
                  </span>
                </button>
                {openMenu && (
                  <div className="absolute left-0 top-[calc(100%+.375rem)] z-30 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <span>
                        <IoEarthOutline />
                      </span>
                      <span>Public</span>
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <span>
                        <TbUsers />
                      </span>
                      <span>Followers</span>
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <span>
                        <LuLock />
                      </span>
                      <span>Only me</span>
                    </button>
                  </div>
                )}
              </span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={toggleEllipsis}
              className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            >
              <span>
                <FaEllipsisH />
              </span>
            </button>
            {openEllipsis && (
              <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <span>
                    <CiBookmark />
                  </span>
                  <span>Save post</span>
                </button>
                {user?.user === post.user._id && (
                  <>
                    <button
                      onClick={() => setOpenUpdate(true)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <span>
                        <GoPencil />
                      </span>
                      <span>Edit post</span>
                    </button>

                    <button
                      onClick={mutate}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      <span>
                        <FaRegTrashAlt />
                      </span>
                      <span>{isPending ? "Deleting..." : "Delete post"}</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* postBody */}
        <div className="mt-3">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 break-all">
            {post?.body}
            <span className="hidden">{id}</span>
          </p>
        </div>
        {/* post Image */}
        <div className="max-h-[38.75rem] rounded rounded-5 overflow-hidden border-y border-slate-200">
          <button
            type="button"
            onClick={() => setSelectedImage(post?.image)}
            className="group relative block w-full rounded rounded-5 cursor-zoom-in"
          >
            <img
              className="w-full object-cover rounded rounded-5"
              src={post?.image}
              alt=""
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10"></span>
          </button>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt=""
            className="max-w-[90%] max-h-[90%] rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {openUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Modal post={post} closeModal={() => setOpenUpdate(false)} />
        </div>
      )}

      {/* activity post */}
      <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
              <VscThumbsup />
            </span>
            <button
              type="button"
              className="font-semibold transition cursor-default"
            >
              <span>{post?.likesCount || 0}</span>
              <span> likes</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <span>
                <CiRepeat />
              </span>
              <span>0</span>
              <span> shares</span>
            </span>
            <span>
              <span>0</span>
              <span> comments</span>
            </span>

            {isPostDetails === false ? (
              <Link
                to={`/postsDetails/${id}`}
                className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]"
              >
                View details
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* activity post */}
      <div className="mx-4 border-t border-slate-200"></div>
      <div className="grid grid-cols-3 gap-1 p-1">
        <button
          onClick={likePostMutation}
          className={` flex items-center justify-center ${post?.likesCount ? "text-[#1877f2] bg-[#DBEAFE] hover:bg-[#DBEAFE] " : "text-slate-600"} ${likePostPending ? "opacity-50  cursor-not-allowed " : "hover:bg-slate-100 cursor-pointer"} gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm`}
        >
          <span className="text-xl">
            <VscThumbsup />
          </span>
          <span>{likePostPending ? "Liking..." : "Like"}</span>
        </button>

        <button
          onClick={() => setShowAddComment(!showAddComment)}
          className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100"
        >
          <span className="text-xl">
            <FiMessageCircle />
          </span>
          <span>Comment</span>
        </button>

        <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
          <span className="text-xl">
            <BsShare />
          </span>
          <span>Share</span>
        </button>
      </div>

      {/* comment */}

      {showAddComment ? (
        <>
          <AddComment
            postId={post._id}
            key={post.topComment?._id}
            comment={post.topComment}
            post={post}
          />
        </>
      ) : (
        post.topComment && (
          <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-[.6875rem] font-bold uppercase tracking-wide text-slate-500">
              Top Comment
            </p>
            <div className="flex items-start gap-2">
              <img
                src={post.topComment?.commentCreator?.photo}
                className="h-8 w-8 rounded-full object-cover"
                alt={post.topComment?.commentCreator?.name}
              />
              <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
                <p className="truncate text-xs font-bold text-slate-900">
                  {post.topComment?.commentCreator.name}
                </p>
                <p className="text-xs text-slate-500">
                  <span>{post.topComment?.commentCreator.username} .</span>
                  <span>{formatTime(post.topComment?.createdAt)}</span>
                </p>
                <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                  {post.topComment?.content}
                </p>
              </div>
            </div>
            <button className="mt-2 text-xs font-bold text-[#1877f2] hover:underline">
              View all comments
            </button>
          </div>
        )
      )}
    </article>
  );
};

export default Post;
