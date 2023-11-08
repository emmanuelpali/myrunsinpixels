import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const { currentUser } = useAuthContext();
  return (
    <>
      <h1 className="text-center text-capitalize" >{currentUser?.displayName}</h1>
      <hr style={{ width: "50%", margin: "3rem auto"}}/>
      <div className="d-flex justify-content-center align-items-center">
      <img style={{ borderRadius: "4px "}} src={currentUser?.photoURL} alt={currentUser?.displayName } width="150" height="150"/> 
        <ul className="list-group mx-5">
          <li className="list-group-item"><span className="fs-5 text-capitalize">name:  </span> {currentUser?.displayName } </li>
          <li className="list-group-item"><span className="fs-5 text-capitalize"></span>{currentUser?.email }</li>
        </ul>
      </div>
    </>
  );
};
export default Profile;
