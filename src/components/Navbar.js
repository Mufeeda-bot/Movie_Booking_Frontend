import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, removeAdmin } from "../store/authSlice";
import axios from "axios";

function Navbar() {
  const admin = useSelector((state) => state.auth.admin);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    axios.get("http://localhost:5000/logout")
      .then(() => {
        dispatch(removeUser());
        dispatch(removeAdmin());
        if (admin) {
           navigate("/admin"); 
        } else {
         navigate("/login"); 
        }
      })
      
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="navbar-brand">
        <h4>Movie</h4>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse mr-auto"
        id="navbarNav"
        style={{ float: "left" }}
      >
        <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
          <li className="nav-item">
            <NavLink exact to={"/"} className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </li>
         

          {admin && (
            <>
            <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/panal"} className="nav-link" activeClassName="active">
                  Movies
                </NavLink>
              </li>
              <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/add"} className="nav-link" activeClassName="active">
                  Add Movies
                </NavLink>
              </li>
              
            </>
          )}

          {!admin && !user&& (
            <>
              <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/admin"} className="nav-link" activeClassName="active">
                  Admin 
                </NavLink>
              </li>
            </>
          )}

        
  
          {!user && !admin&& (
            <>
              <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/login"} className="nav-link" activeClassName="active">
                  User
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
             <li className="nav-item" style={{ marginLeft: "10px" }}>
            <NavLink to={"/movies"} className="nav-link" activeClassName="active">
              Movies
            </NavLink>
          </li>
              <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/my-bookings"} className="nav-link" activeClassName="active">
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
            {(admin || user) && (
            <>
              <li className="nav-item" style={{ marginLeft: "10px" }}>
                <span className="nav-link" onClick={logout}>
                  Logout
                </span>
              </li>
             
            </>
          )}
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
