import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { signOut } from "../actions/users";
import { getPostsBySearch } from "../actions/posts";

function Nav() {
  let cachedUser = useSelector((state) => state.user);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [cachedUser, location]);

  const handleSignOut = () => {
    cachedUser = null;
    dispatch(signOut());
    window.location.reload(false);
  };

  const handleGoToAuth = () => {
    navigate("/auth");
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = (e) => {
    if (query.trim()) {
      dispatch(getPostsBySearch(query.replace(" ", ",")));
      navigate(`/posts/search?searchQuery=${query || "none"}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="nav">
      <Link to="/posts">
        <h1 className="nav-brand">one-word-captures</h1>
      </Link>
      <div className="nav-searchbar">
        <input
          type="text"
          name="search"
          placeholder="filter by tags"
          value={query}
          onChange={handleQueryChange}
        />
        <button onClick={handleQuerySubmit}>search</button>
      </div>
      {user && <p className="nav-user">Signed in as: {user.username}</p>}
      {user ? (
        <div className="auth-btn">
          <button onClick={handleSignOut}>SIGN OUT</button>
        </div>
      ) : (
        <div className="auth-btn">
          <button onClick={handleGoToAuth}>SIGN IN</button>
        </div>
      )}
    </div>
  );
}

export default Nav;
