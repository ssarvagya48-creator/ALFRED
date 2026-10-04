import "./Header.css";

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <span>ALFRED</span>
      </div>

      <nav className="main-nav">
        <a href="#discover">Discover</a>
        <a href="#watchlist">Watchlist</a>
      </nav>
    </header>
  );
}

export default Header;