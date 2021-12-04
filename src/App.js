import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";


function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromStorage = await fetchTasks()
      setTasks(tasksFromStorage)
    }
    getTasks();
  }, []);

  // Fetch tasks from local storage
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:3001/tasks");
    const data = await response.json();
    return data;
  };

  // Fetch a task from local storage
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:3001/tasks/${id}`);
    const data = await response.json();
    return data;
  };

  // Add task to local storage
  const addTask = async (task) => {
    const response = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    setTasks([...tasks, data]);
  };

  // Delete a task from local storage
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE"
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToogle = await fetchTask(id);
    const updatedTask = { ...taskToToogle, reminder: !taskToToogle.reminder };

    const response = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    
    const data = await response.json();
    
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAddTask={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        <div>No tasks</div>
      )}

    </div>
  );
}

export default App;
