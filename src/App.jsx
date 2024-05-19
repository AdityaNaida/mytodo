import { useState, useReducer } from "react";
import List from "./List";
import "./App.css";
export const ACTION = {
  ADD_TODO: "add-todo",
  COMPLETE_TODO: "complete-todo",
  DELETE_TODO: "delete-todo",
  EDIT_TODO: "edit-todo",
};
function reducer(todo, action) {
  switch (action.type) {
    case ACTION.ADD_TODO:
      return [...todo, newTodo(action.payload)];
    case ACTION.COMPLETE_TODO:
      return todo.map((todo) => {
        if (todo.id === action.payload.id)
          return { ...todo, complete: !todo.complete };
        return todo;
      });
    case ACTION.DELETE_TODO:
      return todo.filter((todo) => {
        return todo.id !== action.payload.id;
      });
    case ACTION.EDIT_TODO:
      return todo.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            heading: todo.heading,
            description: todo.description,
            priority: todo.priority,
          };
        }
        return todo;
      });

    default:
      return todo;
  }
}

function newTodo(todo) {
  return {
    id: Math.random(),
    heading: todo.heading,
    description: todo.description,
    priority: todo.priority,
    complete: false,
  };
}

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  function visibilityHandler() {
    setIsVisible((prevState) => !prevState);
  }
  function onSubmitHandler(e) {
    e.preventDefault();

    dispatch({
      type: ACTION.ADD_TODO,
      payload: {
        heading: heading,
        description: description,
        priority: priority,
      },
    });

    setHeading("");
    setDescription("");
    setPriority("");
  }

  function validatePriority(e) {
    e.preventDefault();
    alert("Select priority!");
  }

  return (
    <>
      <div className="container">
        <p className="helloTxt">Hi, User</p>
        <h2 className="heading">Be Productive Today</h2>
        <button
          className={`floatBtn ${isVisible ? `closeBtn` : `addBtn`}`}
          onClick={visibilityHandler}
        >
          {isVisible ? "Close task" : `Add a task`}
        </button>
        {isVisible && (
          <form
            onSubmit={priority === "" ? validatePriority : onSubmitHandler}
            className="form"
          >
            <label htmlFor="taskHeading" className="label">
              Heading
            </label>
            <input
              type="text"
              placeholder=""
              required
              id="taskHeading"
              name="task_heading"
              className="inputFields"
              value={heading}
              onChange={(e) => {
                setHeading(e.target.value);
              }}
            />

            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              rows={5}
              name="description"
              id="description"
              required
              value={description}
              className="inputFields"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>

            <p className="label">Priority</p>
            <div className="priorityContainer">
              <div className="priorityBox">
                <input
                  type="radio"
                  name="task_priority"
                  id="high"
                  value="high"
                  checked={priority === "high"}
                  onChange={() => {
                    setPriority("high");
                  }}
                />
                <label htmlFor="high" className="label">
                  High
                </label>
              </div>
              <div className="priorityBox">
                <input
                  type="radio"
                  name="task_priority"
                  id="medium"
                  value="medium"
                  checked={priority === "medium"}
                  onChange={() => {
                    setPriority("medium");
                  }}
                />
                <label htmlFor="medium" className="label">
                  Medium
                </label>
              </div>
              <div className="priorityBox">
                <input
                  type="radio"
                  name="task_priority"
                  id="low"
                  value="low"
                  checked={priority === "low"}
                  onChange={() => {
                    setPriority("low");
                  }}
                />
                <label htmlFor="low" className="label">
                  Low
                </label>
              </div>
            </div>

            <button className="submitBtn">Add</button>
          </form>
        )}

        <div className="listContainer">
          {todos.map((todo) => {
            return <List todo={todo} dispatch={dispatch} key={todo.id} />;
          })}
        </div>
      </div>
    </>
  );
}
