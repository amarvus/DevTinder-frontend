const UserCard = (user) => {
  //console.log(user);
  const { firstName, lastName, age, about, gender, skills } = user?.user;
  return (
    <div>
      <div className="card bg-base-200 w-85 h-110 shadow-sm">
        <figure>
          <img
            src={user?.user?.profilePicture}
            alt="userImage"
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center pt-4">
            <button className="btn btn-soft btn-primary">Ignore</button>
            <button className="btn btn-soft btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
