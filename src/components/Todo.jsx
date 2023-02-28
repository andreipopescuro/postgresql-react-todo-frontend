import React from "react";
import { customRequest } from "../utils/requestMethods";

const Todo = ({ todos, setTrigger, trigger, setLoading }) => {
  const handleDone = async (todoId, boolean) => {
    try {
      await customRequest.put(`/todos/${todoId}`, {
        done: boolean,
      });
      setTrigger(!trigger);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteTodo = async (id) => {
    setLoading(true);
    await customRequest.delete(`/todos/single/${id}`);
    setTrigger(!trigger);
  };
  return (
    <>
      {todos?.length > 0 ? (
        todos.map((todo) => (
          <div className="row" key={todo.id}>
            <div
              className={`text touchable ${todo.done ? "done" : ""}`}
              onClick={() => handleDone(todo.id, todo.done)}
            >
              {todo.title}
            </div>
            <button
              className="btn red"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <div className="center-posts-text clear">Empty</div>
      )}
    </>
  );
};

export default Todo;
