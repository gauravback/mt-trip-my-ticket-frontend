import api from "@/api/api";
import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiTwotoneStar } from "react-icons/ai";
import { useSelector } from "react-redux";

const Reviews = ({ reviews, packageType, packageId, fetchPackage }) => {
  const token = useSelector((state) => state.authReducer?.value?.token);
  const [rating, setRating] = useState();
  const addReview = async (e) => {
    e.preventDefault();
    if (rating) {
      try {
        const response = await api.post(
          `/api/review/create/${packageType}/${packageId}/`,
          {
            review_text: e.target.review.value,
            rating: rating,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.data;
        const status = await response.status;
        if (status === 201) {
          fetchPackage();
          setRating();
          e.target.review.value = "";
        } else {
          toast.error("Something went wrong", { id: "1" });
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", { id: "1" });
      }
    } else {
      toast.error("Please give star rating", { id: 1 });
    }
  };
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto px-4 md:px-8">
          <h2 className="mb-4  text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl ">
            Customer Reviews
          </h2>
          <form onSubmit={addReview} method="POST" className="mb-6">
            <div className="py-2 relative px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <label htmlFor="comment" className="sr-only">
                Write Review
              </label>
              <textarea
                id="review"
                name="review"
                rows={4}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a review..."
                required
                defaultValue={""}
              />
              <div className="absolute bottom-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setRating(index + 1);
                      }}
                      type="button"
                      className={`${
                        rating >= index + 1
                          ? "text-yellow-400"
                          : "text-gray-400"
                      } focus:outline-none outline-none`}
                    >
                      <AiTwotoneStar fontSize={24} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="py-2.5 px-4 text- font-medium text-center btn-gradient rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
              >
                Add Review
              </button>
            </div>
          </form>

          <div className="divide-y">
            {/* review - start */}
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="flex flex-col gap-3 py-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="block text-sm font-bold uppercase">
                        {review.users_data?.email || review.users_data?.phone}
                      </span>

                      <div className="-ml-1 flex gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`${
                              review.rating >= index + 1
                                ? "text-yellow-400"
                                : "text-gray-400"
                            } focus:outline-none outline-none`}
                          >
                            <AiTwotoneStar fontSize={20} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <span className="block text-sm text-gray-500">
                      {format(new Date(review.review_date), "dd MMMM, yyyy")}
                    </span>
                  </div>
                  {/* stars - start */}

                  <p className="text-gray-600">{review.review_text}</p>
                </div>
              ))
            ) : (
              <h1 className="font-semibold text-center text-xl">
                No Reviews Yet Be The First One
              </h1>
            )}
            {/* review - end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
