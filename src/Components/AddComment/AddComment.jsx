import { GoImage } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { LuSendHorizontal } from "react-icons/lu";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Spinner } from "@heroui/react";
import { useForm } from "react-hook-form";
import AllComment from "../AllComment/AllComment";
import NoComments from "../NoComments/NoComments";
import Loading from './../Loading/Loading';

const AddComment = ({ comment, postId , post}) => {
const {register , reset , handleSubmit} =  useForm({
    defaultValues:{
      content:'',
      image:''
    }
  })

  const addComment = (formData) => {
    console.log(formData);

    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
     headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      },
    );
  };


  const {data , isPending , mutate:addCommentMutate } = useMutation({
    mutationKey:["addComment"],
    mutationFn: addComment,

    onSuccess:()=>{
      toast.success("Comment successfully")
    },

    onError:()=>{
      toast.error("there is an Error")
    },

    onSettled:()=>{
      reset()
    }
  });

  console.log(data);
  


  async function handleAddComment(values) {
  const formData = new FormData();
  if(values.content){
    formData.append('content' , values.content)
  }
  if(values.image[0]){
    formData.append('image' , values.image[0])
  }
  addCommentMutate(formData)
  }

 function getPostComments(){
    return axios.get(`https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=10` , {
        headers: 
        {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
  }
        
    const {data:comments } = useQuery({
        queryKey:["comments" , postId],
        queryFn: getPostComments,
    })
    console.log(comments);

    const postComments = comments?.data?.data?.comments || []
    


  return (
    <div className="border-t border-slate-200 bg-[#f7f8fa] px-4 py-4">
       
       
       
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-extrabold  tracking-wide text-slate-700">
            Comments
          </p>
          <span className="rounded-full bg-[#e7f3ff] px-2 py-0.5 text-[11px] font-bold text-[#1877f2]">
            {post.commentsCount || 0}
          </span>
        </div>
        <select className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none ring-[#1877f2]/20 focus:border-[#1877f2] focus:bg-white focus:ring-2">
          <option value="relevant">Most relevant</option>
          <option value="newest">Newest</option>
        </select>
      </div>

       
     
      {postComments?.length > 0 ? <AllComment postId={postId} post={post} postComments={postComments} />  : <NoComments/>}
      

      <div className="mt-3">
        <form onSubmit={handleSubmit(handleAddComment)}>
        <div className="flex items-start gap-2">
          <img
            src={comment?.user?.photo}
            className="h-9 w-9 rounded-full object-cover"
            alt={comment?.user?.name}
          />

          <div className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white">
              <textarea
              {...register('content')}
              
                rows="1"
                placeholder="Comment as Ahmed ..."
                className="max-h-[140px] min-h-[40px] w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-slate-500"
              ></textarea>
              <div className="mt-1 flex items-center justify-between">
                
                <div className="flex items-center gap-1">
                  <label
                    htmlFor="imgComment"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600"
                  >
                    <span>
                      <GoImage />
                    </span>
                    <input
                    
                      accept="image/*"
                      className="hidden"
                      id="imgComment"
                      type="file"
                      
                    />
                  </label>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-amber-500"
                  >
                    <BsEmojiSmile />
                  </button>
                </div>
              <button
              onClick={addComment}
              disabled={isPending}
                type="submit"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100"
              >
                {isPending ? <Spinner color="current" size="sm"/>  : <LuSendHorizontal />}
                
              </button>
                
              </div>
          </div>
        </div>
          </form>
          
      </div>
    </div>
  );
};

export default AddComment;
