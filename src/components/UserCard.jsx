import axios from "axios";
import { API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  //console.log(user);
  const { firstName, lastName, age, about, gender, _id, profilePicture } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const _res = await axios.post(
        API_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      //console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="card bg-base-200 w-85 h-110 shadow-sm">
        <figure>
          <img
            src={profilePicture}
            alt="userImage"
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center pt-4">
            <button
              className="btn btn-soft btn-primary"
              onClick={() => {
                handleSendRequest("ignored", _id);
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-soft btn-secondary"
              onClick={() => {
                handleSendRequest("interested", _id);
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
