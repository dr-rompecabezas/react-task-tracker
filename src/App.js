import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";


function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      status: "todo",
      priority: "low",
      reminder: true,
      dueDate: "2019-01-01",
      createdAt: "2019-01-01",
      updatedAt: "2019-01-01",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      status: "todo",
      priority: "low",
      reminder: true,
      dueDate: "2019-01-01",
      createdAt: "2019-01-01",
      updatedAt: "2019-01-01",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description 3",
      status: "todo",
      priority: "low",
      reminder: true,
      dueDate: "2019-01-01",
      createdAt: "2019-01-01",
      updatedAt: "2019-01-01",
    },
  ]);

  // Add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
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
