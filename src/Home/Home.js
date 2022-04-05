import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

function Home() {
  const dispatch = useDispatch();
  const cachedUser = useSelector((state) => state.user);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [cachedUser]);

  return (
    <div className="home">
      {user ? (
        <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
      ) : null}
      <Posts setCurrentId={setCurrentId}></Posts>
    </div>
  );
}

export default Home;
