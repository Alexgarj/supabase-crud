import {Link, useLocation} from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <h2> Web II </h2>
                </Link>
            </div>
            <ul className="navbar-nav">
                <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className={`nav-item ${location.pathname === "/users" ? "active" : ""}`}>
                    <Link to="/users" className="nav-link">Users</Link>
                </li>
                <li className={`nav-item ${location.pathname === "/users/create" ? "active" : ""}`}>
                    <Link to="/users/create" className="nav-link">Create User</Link>
                </li>

                {/* ✅ Enlaces corregidos */}
                <li className={`nav-item ${location.pathname === "/cargos" ? "active" : ""}`}>
                    <Link to="/cargos" className="nav-link">Cargos</Link>
                </li>
                <li className={`nav-item ${location.pathname === "/horarios" ? "active" : ""}`}>
                    <Link to="/horarios" className="nav-link">Horarios</Link>
                </li>
                <li className={`nav-item ${location.pathname === "/tickeos" ? "active" : ""}`}>
                    <Link to="/tickeos" className="nav-link">Tickeos</Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;
