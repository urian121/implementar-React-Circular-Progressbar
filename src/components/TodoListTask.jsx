const TodoListTask = ({ tasks, toggleTaskCompletion, borrarTarea }) => {
  return (
    <ul className="list-group list-group-flush horizontal-scroll">
      {tasks.map((task) => (
        <li className="list-group-item" key={task.id}>
          <span
            className="float-start"
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}>
            {task.text}
          </span>

          <span className="float-end">
            <label className="toggle ">
              <input
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
                className="toggle-checkbox"
                type="checkbox"
              />
              <div className="toggle-switch"></div>
            </label>
            <label className="delete ms-2">
              <i
                className="bi bi-trash3"
                onClick={() => borrarTarea(task.id)}></i>
            </label>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoListTask;
