import { useEffect, useState } from "react";
import "./main.scss";

const todolists = JSON.parse(localStorage.getItem("tasks")) || [];
const checkedlists = JSON.parse(localStorage.getItem("checked")) || [];

const Main = () => {
  const [todo, setTodo] = useState("");
  const [display, setDisplay] = useState([]);
  const [check, setcheck] = useState(false);
  const [click, setClick] = useState(false);
  const [checkedArray, setCheckedArray] = useState([]);

  const checked = (task, isCheck) => {
    setcheck(!check);
    if (isCheck) {
      checkedlists.unshift(task);
      const taskIndex = todolists.indexOf(task);
      todolists.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(todolists));
      localStorage.setItem("checked", JSON.stringify(checkedlists));
      setClick(false);
    } else {
      const taskInd = checkedlists.indexOf(task);
      checkedlists.splice(taskInd, 1);
      todolists.unshift(task);
      localStorage.setItem("tasks", JSON.stringify(todolists));
      localStorage.setItem("checked", JSON.stringify(checkedlists));
    }
  };

  useEffect(() => {
    setDisplay(JSON.parse(localStorage.getItem("tasks")));
    setCheckedArray(JSON.parse(localStorage.getItem("checked")));
  }, [todo, check]);

  const todoList = (e) => {
    e.preventDefault();
    todolists.unshift(todo);
    localStorage.setItem("tasks", JSON.stringify(todolists));
    setTodo("");
  };

  const changeHandler = (e) => {
    setTodo(e.target.value);
  };

  const deleteTasks = (e) => {
    e.preventDefault();
    todolists.splice(0, todolists.length);
    checkedlists.splice(0, checkedlists.length);
    localStorage.setItem("tasks", JSON.stringify(todolists));
    localStorage.setItem("checked", JSON.stringify(checkedlists));
    window.location.reload(false);
  };

  return (
    <div className="main">
      <div className="task-container">
        <div className="InputDiv">
          <button
            type="submit"
            className="reset"
            onClick={(e) => deleteTasks(e)}
          >
            <i className="fa fa-trash"></i>
          </button>
          <form onSubmit={(e) => todoList(e)}>
            <input
              type="text"
              placeholder="Your TODO"
              onChange={(e) => changeHandler(e)}
              required
              value={todo}
            />
            <button title="Add Task" type="submit" className="submit">
              <i className="fa fa-plus"></i>
            </button>
          </form>
        </div>
        <div className="display">
          {display &&
            display.map((task) => {
              return (
                <div className="display-task">
                  <span>
                    <input
                      type="checkbox"
                      value={task}
                      checked={click}
                      onClick={(e) => checked(e.target.value, e.target.checked)}
                    />
                  </span>
                  <span className="task">{task}</span>
                </div>
              );
            })}
        </div>
        <div className="checked-display">
          {checkedArray &&
            checkedArray.map((task) => {
              return (
                <div className="display-task">
                  <span>
                    <input
                      type="checkbox"
                      value={task}
                      checked
                      onClick={(e) => checked(e.target.value, e.target.checked)}
                    />
                  </span>
                  <span className="task">{task}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Main;
