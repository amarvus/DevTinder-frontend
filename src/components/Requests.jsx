import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { API_URL } from "../utils/constants";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(API_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data?.data));
      console.log(res?.data?.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) return <h1>No Request Found!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-2xl font-medium">Connection Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, profilePicture, age, gender, about, _id } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-2 rounded-xl bg-base-300 w-4/12 mx-auto"
          >
            <div className="flex items-center m-4">
              <div className="mr-4">
                <img
                  alt="User Profile"
                  className="w-20 h-20 rounded-full object-cover"
                  src={
                    profilePicture ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
              <div className="text-left ml-4">
                <h2 className="text-lg font-semibold">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                {about && <p>{about}</p>}
              </div>
            </div>
            <div className="mr-2">
              <button className="btn btn-outline btn-secondary mx-2">
                Accept
              </button>
              <button className="btn btn-outline btn-primary mxx-2">
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
