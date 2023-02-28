import React from "react";

const Post = ({ posts, handleDeletePost, setCurrentPostId }) => {
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="row">
            <button
              className="text btn"
              onClick={() => setCurrentPostId(post.id)}
            >
              {post.title}
            </button>
            <button
              className="single-post-delete btn red"
              onClick={() => handleDeletePost(post.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <div className="center-posts-text clear">Clear</div>
      )}{" "}
    </>
  );
};

export default Post;
