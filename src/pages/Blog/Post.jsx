import api from "@/api/api";
import Comment from "@/components/Comment/Comment";
import Loader from "@/components/Loader/Loader";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Post = () => {
  const token = useSelector((state) => state.authReducer?.value?.token);

  const { slug } = useParams();
  const [post, setPost] = useState();

  const fetchPost = async () => {
    try {
      const response = await api.get(`/blog/posts/${slug}`);
      const status = await response.status;
      const result = await response.data;
      if (status === 200) {
        setPost(result);
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: "1" });
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [slug]);

  return (
    <div>
      {loading ? (
        <div className="py-24">
          <Loader />
        </div>
      ) : post ? (
        <div className="max-w-7xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <div className="space-y-5 md:space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold md:text-3xl capitalize">
                  {post.title}
                </h2>
              </div>

              <img
                className="w-full object-cover rounded-xl"
                src={post.image}
                alt="Image Description"
              />
              <p
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-gray-900 prose-lg w-full mx-auto"
              ></p>

              <div>
                {post?.tags?.map((tag) => (
                  <p
                    key={tag.id}
                    className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full capitalize text-sm bg-gray-200 text-gray-800"
                  >
                    #{tag.name}
                  </p>
                ))}
              </div>
            </div>
            {/* End Content */}
          </div>
          <div className="max-w-4xl mx-auto">
            <Comment
              comments={post?.comments}
              postId={post?.id}
              token={token}
              fetchPost={fetchPost}
            />
          </div>
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-center">Post Not Available</h1>
      )}
    </div>
  );
};

export default Post;
