import api from "@/api/api";
import Loader from "@/components/Loader/Loader";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    try {
      const response = await api.get("/blog/posts/");
      const status = await response.status;
      const result = await response.data;
      if (status === 200) {
        setPosts(result);
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: "1" });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Title */}
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            Blog
          </h2>
          <p className="mt-1 text-gray-600">
            Explore, Engage, Evolve: Your Journey to Personal Growth
          </p>
        </div>
        {/* End Title */}
        {/* Grid */}
        {posts ? (
          posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts?.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id}>
                  <div className="w-full mb-6">
                    <div className="mb-0 lg:mb-4">
                      <div className="relative mb-5 overflow-hidden h-72">
                        <img
                          className="object-cover w-full h-full transition-all rounded hover:scale-110"
                          src={post.image}
                          alt={post.title}
                        />
                        <span className="absolute px-4 py-2 text-xs font-semibold text-gray-500 rounded dark:text-gray-400 top-4 left-4 bg-blue-50 dark:bg-gray-800">
                          {format(new Date(post.created_at), "dd MMM, yyyy")}
                        </span>
                      </div>
                      <h2 className="mb-3 text-xl font-bold leading-9 text-blue-800">
                        {post.title}
                      </h2>
                      <p className="">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: post.content.slice(0, 100),
                          }}
                          className="text-base leading-7 text-gray-400"
                        ></span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-center">
              No Posts Available
            </h1>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Posts;
