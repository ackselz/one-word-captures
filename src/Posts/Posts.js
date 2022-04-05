import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

function Posts({ setCurrentId }) {
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);

  return !posts.length ? null : (
    <>
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          user={user}
          setCurrentId={setCurrentId}
        ></Post>
      ))}
    </>
  );
}

export default Posts;
