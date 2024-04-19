/**
 * Ejemplo usando el hook useState para controlar el estado de las tareas
 */
import { useState } from "react";
import "../assets/css/toogle.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Titulo from "./Titulo";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [defaultStatus, setDefaultStatus] = useState(false); // Estado por defecto de la tarea

  // Actualiza el estado de la nueva tarea según el valor introducido en el campo de entrada.
  const handleInputChange = (event) => {
    // Actualiza el estado de la nueva tarea con el valor del campo de entrada.
    setNewTask(event.target.value);
  };

  // Actualiza el estado por defecto de la tarea según el cambio en el checkbox.
  const handleCheckboxChange = (event) => {
    // Actualiza el estado por defecto de la tarea con el estado de verificación del checkbox.
    setDefaultStatus(event.target.checked);
  };

  // Maneja el envío del formulario para agregar una nueva tarea.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() === "") return;

    setTasks([
      ...tasks,
      { id: tasks.length + 1, text: newTask, completed: defaultStatus }, // Establecer el estado de la tarea al valor del checkbox
    ]);
    setNewTask("");
  };

  // Cambia el estado de completado de una tarea específica identificada por su ID.
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const totalTasksCount = tasks.length;

  // Elimina una tarea del estado de tareas utilizando el ID proporcionado.
  const borrarTarea = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <Titulo />

      <div className="row justify-content-center mt-5">
        <div className="col-md-4" style={{ borderRight: "1px solid #ccc" }}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              value={newTask}
              onChange={handleInputChange}
              placeholder="Nueva Tarea"
            />

            <div className="form-check mt-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="defaultStatusCheckbox"
                checked={defaultStatus}
                onChange={handleCheckboxChange}
              />
              <label
                className="form-check-label float-start"
                htmlFor="defaultStatusCheckbox">
                ¿La tarea está completada?
              </label>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Registrar Tarea
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-5">
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
        </div>

        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <div style={{ width: "200px", height: "200px", margin: "auto" }}>
            <CircularProgressbar
              value={(completedTasksCount / totalTasksCount) * 100 || 0}
              text={`${completedTasksCount}/${totalTasksCount}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
