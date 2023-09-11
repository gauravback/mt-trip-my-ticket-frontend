import api from "@/api/api";
import React from "react";
import toast from "react-hot-toast";

const UpdateProfile = ({
  text,
  fontSize = "xs",
  name,
  email,
  phone,
  gender,
  meritalStatus,
  birthday,
  address,
  provider,
  fetchProfile,
  token,
}) => {
  const updateProfile = async (e) => {
    e.preventDefault();
    toast.loading("Processing...", { id: "1" });
    try {
      const {
        name,
        gender,
        phone,
        email,
        merital_status,
        birthday,
        address_input,
      } = e.target;

      const response = await api.post(
        "/user/profile/",
        {
          name: name.value,
          email: email.value,
          phone: phone.value,
          gender: gender.value,
          merital_status: merital_status.value,
          address: address_input.value,
          birthday: birthday.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const status = await response.status;

      if (status === 200) {
        fetchProfile();
        toast.success("Profile updated successfully.", { id: "1" });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Something went wrong.", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", { id: "1" });
    }
  };
  return (
    <div>
      <buttton
        type="button"
        className={`text-blue-600 cursor-pointer text-${fontSize}`}
        data-hs-overlay="#hs-modal-update-profile"
      >
        {text}
      </buttton>

      <div
        id="hs-modal-update-profile"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-2xl font-bold text-gray-800">
                  Update Profile
                </h2>
              </div>
              <div className="mt-5">
                {/* Form */}
                <form method="POST" onSubmit={updateProfile}>
                  <div className="grid md:grid-cols-2 md:gap-y-3 md:gap-x-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                          provider !== "phone" ? "pointer-events-none" : ""
                        }`}
                        defaultValue={email}
                        required
                      />
                      <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email Address
                      </label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 ${
                          provider === "phone" ? "pointer-events-none" : ""
                        }`}
                        defaultValue={phone}
                        required
                      />
                      <label
                        htmlFor="phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Phone Number
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        defaultValue={name}
                        required
                      />
                      <label
                        htmlFor=""
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <select
                        type="text"
                        name="gender"
                        id="gender"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        required
                      >
                        <option hidden value={gender} selected>
                          {gender}
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <label
                        htmlFor="gender"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Gender
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <select
                        type="text"
                        name="merital_status"
                        id="merital_status"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      >
                        <option hidden value={meritalStatus} selected>
                          {meritalStatus}
                        </option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                      </select>
                      <label
                        htmlFor="merital_status"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Merital Status
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="date"
                        name="birthday"
                        id="birthday"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        defaultValue={birthday}
                        required
                      />
                      <label
                        htmlFor="birthday"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Birthday
                      </label>
                    </div>
                  </div>
                  <div className="relative z-0 w-full my-[1.25rem] group">
                    <textarea
                      type="tel"
                      name="address_input"
                      id="address_input"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 resize-none"
                      defaultValue={address}
                      rows={4}
                      required
                    ></textarea>
                    <label
                      htmlFor="address_input"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Address
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn-gradient focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Update
                  </button>
                </form>

                {/* End Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
