import React, { useCallback, useEffect, useState } from "react";
import { customRequest } from "../utils/requestMethods";
import Todo from "./Todo";
import CustomInput from "./Custom/CustomInput";

const Todos = ({ currentPostId, globalTrigger, setGlobalTrigger }) => {
  const [todos, setTodos] = useState([]);
  const [todoValue, settodoValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [postTitle, setPostTitle] = useState("");

  const handleInputChange = useCallback((e) => {
    settodoValue(e.target.value);
  }, []);

  const handleAddTodo = useCallback(async () => {
    if (todoValue !== "") {
      setLoading(true);
      try {
        await customRequest.post(`/todos/${currentPostId}`, {
          title: todoValue,
        });
        settodoValue("");
        setTrigger(!trigger);
      } catch (error) {
        setLoading(false);
      }
    }
  }, [todoValue, currentPostId]);
  useEffect(() => {
    if (currentPostId) {
      setLoading(true);
      const getTodos = async () => {
        try {
          const { data } = await customRequest.get(`/todos/${currentPostId}`);
          setTodos(data);
          setLoading(false);
          setPostTitle(data.title);
        } catch (error) {
          console.log(error.message);
        }
      };
      getTodos();
    }
  }, [currentPostId, trigger]);

  const handleRename = (e) => {
    setPostTitle(e.target.value);
  };

  const handleChangePostTitle = async () => {
    if (postTitle !== "") {
      setLoading(true);
      try {
        await customRequest.put(`/posts/${currentPostId}`, {
          title: postTitle,
        });
        setTrigger(!trigger);
        setGlobalTrigger(!globalTrigger);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
  };

  const handleClearTodos = async () => {
    setLoading(true);
    try {
      await customRequest.delete(`/todos/${todos.id}`);
      setTrigger(!trigger);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="todos container">
      {currentPostId && (
        <>
          <div className="new-post-form">
            <CustomInput
              type="text"
              value={postTitle}
              className="new-post-input"
              onChange={handleRename}
              functionToSubmit={handleChangePostTitle}
            />
            <button
              className="btn new-post-submit"
              onClick={handleChangePostTitle}
            >
              Change name
            </button>
          </div>
          <div className="new-post-form">
            <CustomInput
              type="text"
              onChange={handleInputChange}
              value={todoValue}
              className="new-post-input"
              placeholder="Type new..."
              functionToSubmit={handleAddTodo}
            />
            <button onClick={handleAddTodo} className="btn new-post-submit">
              ADD
            </button>
          </div>
          <div className="rows">
            {loading ? (
              <div className="center-posts-text">Updating...</div>
            ) : (
              <Todo
                todos={todos?.Todos}
                setTrigger={setTrigger}
                setLoading={setLoading}
                trigger={trigger}
              />
            )}
          </div>
          <div className="todos-buttons">
            <button className="btn new-post-submit save">Save changes</button>
            <button
              className="btn red"
              onClick={handleClearTodos}
              disabled={loading}
            >
              Clear list
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Todos;
