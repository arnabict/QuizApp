import { Link } from "react-router-dom";
import logo from "../assets/images/logo-bg.png";
import classes from "../styles/Nav.module.css";
import Account from "./Account";

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <span>
              <img src={logo} alt="Learn with Sumit Logo" />
            </span>
            <span>
              <h3>Learn with Sumit</h3>
            </span>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
