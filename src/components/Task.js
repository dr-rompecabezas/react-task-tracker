import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={task.reminder ? "task reminder" : "task"}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.title}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />{" "}
      </h3>
      <p>{task.dueDate}</p>
    </div>
  );
};

export default Task;
