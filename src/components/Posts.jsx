import React, { useEffect, useRef, useState } from "react";
import { customRequest } from "../utils/requestMethods";
import Post from "./Post";
import CustomInput from "./Custom/CustomInput";

const Posts = ({ userId, setCurrentPostId, globalTrigger }) => {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  // loading will be true at every change of user and false after retriving data from db
  // trigger will change the value at every change in order to rerun useEffect
  useEffect(() => {
    // Runs only if there is a user and every time the user makes a change
    if (userId) {
      const getPosts = async () => {
        const { data } = await customRequest.get(`/posts/${userId}`);
        setPosts(data);
        setLoading(false);
      };
      getPosts();
    }
  }, [userId, trigger, globalTrigger]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  // const checkForEnterPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleNewPost();
  //   }
  // };

  const handleNewPost = async () => {
    if (inputValue !== "") {
      setLoading(true);
      await customRequest.post(`/posts/${userId}`, {
        title: inputValue,
      });
      setInputValue("");
      setTrigger(!trigger);
    }
    return;
  };

  const handleDeletePosts = async () => {
    if (posts.length > 0) {
      setLoading(true);
      await customRequest.delete(`/posts/${userId}`);
      setTrigger(!trigger);
      setCurrentPostId("");
    }
    return;
  };

  const handleDeletePost = async (postId) => {
    setLoading(true);
    await customRequest.delete(`/posts/${userId}/${postId}`);
    setTrigger(!trigger);
    setCurrentPostId("");
  };

  return (
    <div className="posts container">
      <div className="new-post-form">
        {/* <input
          value={inputValue}
          type="text"
          onChange={handleInput}
          placeholder="Type in here new task..."
          className="new-post-input"
          onKeyDown={checkForEnterPress}
        /> */}
        <CustomInput
          value={inputValue}
          type="text"
          onChange={handleInput}
          placeholder="Type in here new task..."
          className="new-post-input"
          functionToSubmit={handleNewPost}
        />

        <button
          className="new-post-submit btn"
          type="button"
          onClick={handleNewPost}
        >
          Submit
        </button>
      </div>
      <div className="rows">
        {loading ? (
          <div className="center-posts-text">Updating...</div>
        ) : (
          <Post
            posts={posts}
            handleDeletePost={handleDeletePost}
            setCurrentPostId={setCurrentPostId}
          />
        )}
      </div>
      <button
        className="delete-all-posts red"
        onClick={handleDeletePosts}
        disabled={loading}
      >
        Clear list
      </button>
    </div>
  );
};

export default Posts;
