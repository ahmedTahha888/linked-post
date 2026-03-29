import axios from "axios";
import { CiBookmark, CiFaceSmile, CiSearch } from "react-icons/ci";
import { FiSend, FiUserPlus } from "react-icons/fi";
import { GoImage } from "react-icons/go";
import { IoEarthOutline, IoNewspaperOutline } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import Post from "../Post/Post";
import { useQuery } from "@tanstack/react-query";
import Followers from "../Followers/Followers";
import Loading from "../Loading/Loading";
import CreatePost from "../CreatePost/CreatePost";

const Community = () => {
  const styleNav = ({ isActive }) =>
    `mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
      isActive
        ? "bg-[#e7f3ff] text-[#1877f2]"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  const navStyle = ({ isActive }) =>
    `flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-[#e7f3ff] text-[#1877f2]"
        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
    }`;

  function getAllPosts() {
    return axios.get("https://route-posts.routemisr.com/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
  console.log(data, "data");
  // console.log(isLoading , "isLoading");
  // console.log(isFetching , "isFetching");
  // console.log(isError , "isError");

  return (
    <div className="bg-[#F0F2F5]">
      <div className="mx-auto max-w-7xl px-3 py-3.5 bg-[#F0F2F5]">
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

                <NavLink to="/saidPost" className={styleNav}>
                  <span>
                    <LuSparkles />
                  </span>
                  <span>My Posts</span>
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
                  <NavLink to="/saidPost" className={navStyle}>
                    <span>
                      <LuSparkles />
                    </span>
                    <span>My Posts</span>
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

              <div className="space-y-4">
                {isLoading ? (
                  <>
                    <Loading />
                    <Loading />
                    <Loading />
                  </>
                ) : (
                  data?.data.data.posts.map(function (post, idx) {
                    return (
                      <Post
                        key={idx}
                        post={post}
                        id={post._id}
                        isPostDetails={false}
                        commentLimit={1}
                      />
                    );
                  })
                )}
              </div>
            </section>

            <aside className="hidden h-fit xl:sticky xl:top-[84px] xl:block">
              {/* {data?.data.data.suggestions.map(function( user ,idx){return <Followers key={idx} user={user}/> })} */}

              <Followers />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Community;
