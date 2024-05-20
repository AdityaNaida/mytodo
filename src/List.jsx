import "./List.css";
import { ACTION } from "./App";

export default function List({ todo, dispatch, editHandler }) {
  return (
    <>
      <div
        className={`list ${todo.priority} ${
          todo.complete ? `compeleted` : `notcompleted`
        }`}
      >
        <button
          className="completeBtn"
          onClick={() => {
            dispatch({ type: ACTION.COMPLETE_TODO, payload: { id: todo.id } });
          }}
        >
          <i className="ri-checkbox-circle-line"></i>
        </button>
        <h2 className="todoHeading">{todo.heading}</h2>
        <p className="todoDescription">{todo.description}</p>
        <div className="todoControllers">
          <button
            className="editBtn"
            onClick={() => {
              editHandler(todo);
            }}
          >
            <i className="ri-edit-line"></i>
          </button>
          <button
            className="deleteBtn"
            onClick={() => {
              dispatch({ type: ACTION.DELETE_TODO, payload: { id: todo.id } });
            }}
          >
            <i className="ri-delete-bin-6-line"></i>
          </button>
        </div>
      </div>
    </>
  );
}
