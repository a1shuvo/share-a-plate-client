import { Link } from "react-router";
import logo from "/logo.png";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div>
        <img className="w-40" src={logo} alt="ShareAPlate Logo" />
      </div>
    </Link>
  );
};

export default Logo;
