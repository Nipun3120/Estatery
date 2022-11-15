import "./Navbar.css";
import { MdApartment } from "react-icons/md";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div className="nav">
      <div className="flex-row nev-left">
        <MdApartment size={30} className="logo-icon" />
        <Link className="nav-icon estatery" to="/">
          Estatery
        </Link>
        <div className="nav-links">
          <ul className="nav-links-ul flex-row">
            <Link
              to="/"
              className="nav-active"
              style={{
                textDecoration: "none",
                backgroundColor: "#e7e6f9",
                color: "#7064f0",
                padding: "0.5rem 1rem",
                marginRight: 10,
              }}
            >
              Rent
            </Link>
            <li>Buy</li>
            <li>Sell</li>
            <li>Manage Property</li>
            <li>Resources</li>
            <Link
              to="/favourites"
              style={{
                color: "black",
                marginLeft: -10,
                textDecoration: "none",
              }}
            >
              <li>Favourites</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="nav-right nav-buttons">
        <button className="button button-secondary">Login</button>
        <button className="button button-primary margin-left-1">SignUp</button>
      </div>
    </div>
  );
};
