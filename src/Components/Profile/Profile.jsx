import { useQuery } from "@tanstack/react-query";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import axios from "axios";
import Post from "../Post/Post";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";

const Profile = () => {
  const { token } = useContext(authContext);
  console.log(token);

  const getMyProfile = () => {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  };

  const {data, isLoading} = useQuery({
    queryKey: ["ProfileInfo"],
    queryFn: getMyProfile,
    select: (data) => data?.data?.data?.user,
  });
  console.log(data);

  const getUserPosts = () => {
    return axios.get(
      `https://route-posts.routemisr.com/users/${data?._id}/posts`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  };

  const { data: userPost = [] } = useQuery({
    queryKey: ["userPost"],
    queryFn: getUserPosts,
    enabled: !!data?.id,
    select: (userPost) => userPost.data.data.posts,
  });
  console.log("userPost", userPost);
  return (
    <>
      <ProfileInfo data={data} />;
      {userPost?.map((post) => {
        return (
          <div key={post._id} className="mx-auto max-w-7xl px-3 py-3.5">
              {isLoading ? <Loading /> : <Post post={post} id={post._id} />}
          </div>
        );
      })}
    </>
  );
};

export default Profile;
