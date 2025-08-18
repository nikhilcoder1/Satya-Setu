import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Hide navbar on SignIn and SignUp pages
  if (location.pathname === "/" || location.pathname === "/signup") return null;

  return (
    <nav className="bg-gray-900 text-green-400 p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/home" className="hover:text-green-500">
          Home
        </Link>
        <Link to="/create-post" className="hover:text-green-500">
          Create Complaint
        </Link>
      </div>

      {user && (
        <div className="flex items-center space-x-2">
          <Link
            to={`/profile/${user.username}`}
            className="hover:text-green-500 font-semibold"
          >
            {user.username}
          </Link>
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-8 h-8 rounded-full border-2 border-green-500"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;