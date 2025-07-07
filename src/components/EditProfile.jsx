import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [profilePicture, setProfilePicture] = useState(
    user.profilePicture ||
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        API_URL + "/profile/edit",
        { firstName, lastName, profilePicture, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      console.log(res?.data?.data);
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Profile</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Profile Photo URL</legend>
                <input
                  type="text"
                  value={profilePicture}
                  className="input"
                  onChange={(e) => setProfilePicture(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  value={age}
                  className="input"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  value={gender}
                  className="input"
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Male, Female, Other"
                />
              </fieldset>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  value={about}
                  className="input"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-400">{error}</p>
            <div className="card-actions justify-center mt-0.5">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, profilePicture, age, gender, about }}
      />
    </div>
  );
};

export default EditProfile;
