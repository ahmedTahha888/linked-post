import { CiBookmark } from "react-icons/ci";

import { IoEarthOutline, IoNewspaperOutline } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import Post from "../Post/Post";
import axios from "axios";
import Followers from "../Followers/Followers";
import Loading from "../Loading/Loading";
import CreatePost from "../CreatePost/CreatePost";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loading/Loader";
import { Helmet } from "react-helmet";

const Feed = () => {
  const navStyle = ({ isActive }) =>
    `flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-[#e7f3ff] text-[#1877f2]"
        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
    }`;

  const styleNav = ({ isActive }) =>
    `mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
      isActive
        ? "bg-[#e7f3ff] text-[#1877f2]"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["homeFeed"],
    queryFn: homeFeed,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  function homeFeed() {
    return axios.get(
      "https://route-posts.routemisr.com/posts/feed?only=following&limit=10",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  const posts = data?.data?.data?.posts || [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Feed Page </title>
      </Helmet>

      <div className="bg-[#F0F2F5]">
        <div className="mx-auto max-w-7xl px-3 py-3.5">
          <main className="min-w-0">
            <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
              <aside className="hidden h-fit space-y-3 xl:sticky xl:top-[84px] xl:block">
                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <NavLink to="/feed" className={styleNav}>
                    <span>
                      <IoNewspaperOutline />
                    </span>
                    <span>Feed</span>
                  </NavLink>

                  <NavLink to="/community" className={styleNav}>
                    <span>
                      <IoEarthOutline />
                    </span>
                    <span>Community</span>
                  </NavLink>

                  <NavLink to="/saved" className={styleNav}>
                    <span>
                      <CiBookmark />
                    </span>
                    <span>Saved</span>
                  </NavLink>
                </div>
              </aside>

              <section className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm xl:hidden">
                  <div className="grid grid-cols-2 gap-2">
                    <NavLink to="/feed" className={navStyle}>
                      <span>
                        <IoNewspaperOutline />
                      </span>
                      <span>Feed</span>
                    </NavLink>

                    <NavLink to="/community" className={navStyle}>
                      <span>
                        <IoEarthOutline />
                      </span>
                      <span>Community</span>
                    </NavLink>
                    <NavLink to="/saved" className={navStyle}>
                      <span>
                        <CiBookmark />
                      </span>
                      <span>Saved</span>
                    </NavLink>
                  </div>
                </div>

                {/* Suggested Friends */}
                <div className="space-y-3 xl:hidden">
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900">
                      <TbUsers className="lucide lucide-users text-[#1877f2]" />{" "}
                      <span>Suggested Friends</span>
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                        10
                      </span>
                      <span className="text-xs font-bold text-[#1877f2]">
                        Show
                      </span>
                    </span>
                  </button>
                </div>

                {/* Create Post */}

                <CreatePost />

                {/* post */}

                {isFetching ? (
                  <>
                    <Loading />
                    <Loading />
                    <Loading />
                  </>
                ) : posts.length > 0 ? (
                  <div className="space-y-4">
                    {posts.map((post, idx) => (
                      <Post key={idx} post={post} id={post._id} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                    No posts yet. Be the first one to publish.
                  </div>
                )}
              </section>
              <aside className="hidden h-fit xl:sticky xl:top-[84px] xl:block">
                <Followers />
              </aside>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Feed;
