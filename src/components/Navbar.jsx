import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        🍴 Recipe Finder
      </div>


      {/* Center Links */}
      <div className="nav-center">

        <Link to="/favorites">
          ⭐ Favorites
        </Link>

        <Link to="/summer-recipes">
          🌞 Summer Recipes
        </Link>

        <Link to="/occasions">
          🎉 Occasions
        </Link>

      </div>


    </nav>
  );
}

export default Navbar;