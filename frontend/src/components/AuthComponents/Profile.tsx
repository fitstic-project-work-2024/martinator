import { useAuth0 } from "@auth0/auth0-react";

type user = {
  name: string;
  picture: string;
  email: string;
};

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth0<user>();

  return isAuthenticated ? (
    <>
      <div className="flex justify-start items-center size-fit">
        <img
          src={user?.picture ?? ""}
          alt={user?.name ?? ""}
          className="h-10 rounded-full mr-2 ml-6"
        />
        <div>
          <p className="lg:inline hidden">
            {user?.email ?? ""}
          </p>
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-start items-center">
      <i className="fa-solid fa-user mr-2" style={{ color: "#fff" }}></i>
      <p>Anonimo</p>
    </div>
  );
};

export default Profile;
