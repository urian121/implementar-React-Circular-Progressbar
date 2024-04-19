import { useState, useMemo } from "react";
import "../assets/css/toogle.css";
import Titulo from "./Titulo";
import TodoForm from "./TodoForm";
import TodoListTask from "./TodoListTask";
import ProgressBar from "./ProgressBar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [defaultStatus, setDefaultStatus] = useState(false);

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
    // Evita que el formulario se envíe de forma predeterminada.
    event.preventDefault();
    // Verifica si el valor de la nueva tarea está vacío y, de ser así, detiene la función.
    if (newTask.trim() === "") {
      if (!toast.isActive("Toastify__toast")) {
        toast.error("La tarea no puede estar vacía", {
          toastId: "Toastify__toast",
        });
      }
      return;
    }

    // Agrega la nueva tarea al estado de tareas, incluyendo un ID único, el texto de la tarea y su estado de completado.
    setTasks([...tasks, { id: tasks.length + 1, text: newTask, completed: defaultStatus }]);
    // Restablece el valor de la nueva tarea después de agregarla.
    setNewTask("");
    toast.success("Tarea agregada");
  };
  // Cambia el estado de completado de una tarea específica identificada por su ID.
  const toggleTaskCompletion = (id) => {
    // Actualiza el estado de tareas, modificando la tarea correspondiente según su ID.
    setTasks(
      tasks.map((task) => {
        // Si el ID de la tarea coincide con el ID proporcionado, cambia el estado de completado.
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        // Devuelve la tarea sin cambios si no coincide con el ID proporcionado.
        return task;
      })
    );
  };

  // Elimina una tarea del estado de tareas utilizando el ID proporcionado.
  const borrarTarea = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Tarea eliminada");
  };

  // Calcula el número de tareas completadas utilizando useMemo para memoizar el valor y evitar recálculos innecesarios.
  const completedTasksCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const totalTasksCount = tasks.length;

  return (
    <>
      <ToastContainer />
      <Titulo />

      <div className="row justify-content-center mt-5">
        <div className="col-md-4" style={{ borderRight: "1px solid #ccc" }}>
          <TodoForm
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            newTask={newTask}
            defaultStatus={defaultStatus}
          />
        </div>

        <div className="col-md-5">
          <TodoListTask
            tasks={tasks}
            toggleTaskCompletion={toggleTaskCompletion}
            borrarTarea={borrarTarea}
          />
        </div>

        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <ProgressBar
            completedTasksCount={completedTasksCount}
            totalTasksCount={totalTasksCount}
          />
        </div>
      </div>
    </>
  );
}

export default TodoApp;
