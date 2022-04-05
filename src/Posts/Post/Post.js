import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../actions/posts";

function Post({ post, setCurrentId, user }) {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(post?.likes);
  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (post.likes.includes(user?.username)) {
      setLikes(post.likes.filter((like) => like !== user?.username));
    } else {
      setLikes([...post.likes, user?.username]);
    }
  };

  return (
    <div className="card">
      {user && (
        <button
          className="card-btn card-btn-edit"
          onClick={() => setCurrentId(post._id)}
        >
          <img src="/assets\more_vert_black_24dp.svg" alt="" />
        </button>
      )}
      {user && (
        <button
          className="card-btn card-btn-delete"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <img src="/assets\delete_forever_black_24dp.svg" alt="" />
        </button>
      )}
      <div className="card-img-container">
        <img className="card-img" src={post.selectedFile} alt="" />
      </div>
      <div className="card-body">
        <p className="card-createdAt">{moment(post.createdAt).fromNow()}</p>
        <p className="card-tags">
          {post.tags.map((tag, i) => (
            <span key={i}>#{tag} </span>
          ))}
        </p>
        <p className="card-text">{post.message}</p>
      </div>
      <div className="card-footer">
        <div className="card-likes">
          {user && (
            <button className="card-btn card-btn-like" onClick={handleLike}>
              {likes.includes(user.username) ? (
                <img
                  src="/assets\favorite_border_black_24dp_filled.svg"
                  alt=""
                />
              ) : (
                <img src="/assets\favorite_border_black_24dp.svg" alt="" />
              )}
            </button>
          )}
          <p className="card-likeCount">
            {likes.length} {likes.length === 1 ? "like" : "likes"}
          </p>
        </div>
        <p className="card-creator">by {post.creator}</p>
      </div>
    </div>
  );
}

export default Post;
