import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../Post/Post";
import { Spinner } from "@heroui/react";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

const PostsDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  function getSinglePost() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id} `, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ["post", id],
    queryFn: getSinglePost,
  });

  if (isLoading) {
    return (
      <div className="space-y-5 w-[80%] mx-auto my-10 ">
        <Loading />
        <Loading />
        <Loading />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className=" text-red-600 text-7xl">Error</h1>
      </div>
    );
  }

  return (

    <>

     <Helmet>
        <title>Post Details Page </title>
      </Helmet>
    
    <div className="bg-[#F0F2F5] ">
      <div className="w-[80%] mx-auto my-10">
        <button
          onClick={() => navigate("/community")}
          className="mt-5 mb-4 cursor-pointer rounded-lg bg-white px-4 py-2 hover:bg-slate-200 transition"
        >
          <span>← Back</span>
        </button>

        <div className="space-y-4">
          {
            <Post
              post={data?.data.data.post}
              isPostDetails={true}
              commentLimit={Infinity}
            />
          }
        </div>
      </div>
    </div>
    </>
  );
};

export default PostsDetails;
