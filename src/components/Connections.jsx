import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import axios from "axios";
import { API_URL } from "../utils/constants";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(API_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0)
    return <h1 className="text-center my-10">No Connections Found!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-2xl font-medium">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, profilePicture, _id, about, age, gender } =
          connection;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-xl bg-base-300 w-4/12 mx-auto"
          >
            <div>
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
        );
      })}
    </div>
  );
};

export default Connections;
