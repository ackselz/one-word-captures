import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp, signIn } from "../actions/users";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const changeMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && userData.username.trim() === "") {
      return alert("Username cannot be blank");
    }
    if (isSignup && userData.confirmPassword !== userData.password) {
      return alert("Passwords do not match");
    }
    isSignup
      ? dispatch(
          signUp({ username: userData.username, password: userData.password })
        ).then((res) => {
          res?.type === "ERROR"
            ? alert(res.payload.message)
            : navigate("/posts");
        })
      : dispatch(
          signIn({ username: userData.username, password: userData.password })
        ).then((res) => {
          res?.type === "ERROR"
            ? alert(res.payload.message)
            : navigate("/posts");
        });
  };

  return (
    <div className="auth">
      <p className="auth-header">{isSignup ? "Sign Up" : "Sign In"}</p>

      <form className="auth-form" action="" onSubmit={handleSubmit}>
        {/* {isSignup && (
          <div className="auth-form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" id="" onChange={handleChange} />
          </div>
        )} */}
        <div className="auth-form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            required
            onChange={handleChange}
            value={userData.username}
          />
        </div>
        <div className="auth-form-group">
          {isSignup ? (
            <label htmlFor="password">*Password:</label>
          ) : (
            <label htmlFor="password">Password:</label>
          )}

          <input
            type="password"
            name="password"
            required
            pattern={
              isSignup
                ? "^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                : null
            }
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        {isSignup ? (
          <p className="auth-form-pw">
            *Minimum eight characters, at least one letter, one number and one
            special character
          </p>
        ) : null}

        {isSignup && (
          <div className="auth-form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              pattern="^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
              required
              value={userData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        )}
        <button className="auth-form-submit" type="submit">
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <button className="auth-changeMode" type="button" onClick={changeMode}>
        {isSignup
          ? "Already have an account? Sign in here"
          : "Don't have an account? Sign up here"}
      </button>
    </div>
  );
}

export default Auth;
