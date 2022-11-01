import Link from "next/link";
import navStyles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={navStyles.nav}>
      <Link href="/">
        <h2>HomeLoans</h2>
      </Link>
    </nav>
  );
};

export default Navbar;
