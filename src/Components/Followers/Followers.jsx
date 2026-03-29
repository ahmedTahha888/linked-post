import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";
import LoadingFollowers from "../Loading/LoadingFollowers";

const Followers = () => {
  async function followSuggestions() {
    return await axios.get(
      "https://route-posts.routemisr.com/users/suggestions?limit=10",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  }

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["suggestions"],
    queryFn: followSuggestions,
  });
  //   console.log(data, "data");
  //   console.log(isLoading, "isLoading");
  //   console.log(isFetching, "isFetching");
  //   console.log(isError, "isError");

  // if (isLoading) {
  //   return (
  //     <Spinner
  //       className="flex justify-center items-center"
  //       color="primary"
  //       label="Loading..."
  //     />
  //   );
  // }
  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className=" text-red-600 text-7xl">Error</h1>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#1877f2]">
              <TbUsers />
            </span>
            <h3 className="text-base font-extrabold text-slate-900">
              Suggested Friends
            </h3>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            10
          </span>
        </div>
        <div className="mb-3">
          <label htmlFor="" className="relative block">
            <span className=" pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <CiSearch />
            </span>
            <input
              type="text"
              placeholder="Search friends..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
            />
          </label>
        </div>
        {isLoading ? (
          <div className=" space-y-4">
            <LoadingFollowers />
            <LoadingFollowers />
            <LoadingFollowers />
            <LoadingFollowers />
            <LoadingFollowers />
            <LoadingFollowers />
          </div>
        ) : (
          <>
            <div className="space-y-3 ">
              {data?.data.data.suggestions.map((user, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 p-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                    >
                      <img
                        src={user.photo}
                        className="h-10 w-10 rounded-full object-cover"
                        alt=""
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {user.username}
                        </p>
                      </div>
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
                      <span>
                        <FiUserPlus />
                      </span>
                      <span>Follow</span>
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5">{`${user.followersCount} followers`}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
              View more
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Followers;
