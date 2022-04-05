import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../actions/posts";

function Form({ currentId, setCurrentId }) {
  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );
  const user = useSelector((state) => state.user);
  const [postData, setPostData] = useState({
    title: "",
    tags: "",
    selectedFile: "",
  });
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, creator: user.username }));
    } else {
      dispatch(createPost({ ...postData, creator: user.username }));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="form-header">{currentId ? "Edit" : "Create"}</p>
      <div className="form-group">
        <label className="form-label" htmlFor="title">
          One-Word-Title
        </label>
        <input
          className="form-input"
          type="text"
          name="title"
          placeholder="title"
          required
          pattern="^\S*$"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="tags">
          Tags (CSV format)
        </label>
        <input
          className="form-input"
          type="text"
          name="tags"
          placeholder="tags"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: [...e.target.value.split(",")] })
          }
        />
      </div>
      <div className="form-fileBase">
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        ></FileBase>
      </div>
      <button className="" type="submit">
        Submit
      </button>
      <button className="" type="button" onClick={clear}>
        Clear
      </button>
    </form>
  );
}

export default Form;
