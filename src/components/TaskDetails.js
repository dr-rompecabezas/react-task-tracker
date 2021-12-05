import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "./Button";

const TaskDetails = () => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3001/tasks/${params.id}`);
      const data = await response.json();

      if (response.status === 404) {
        navigate("/not-found");
      }

      setTask(data);
      setLoading(false);
    };
    
    fetchTask();
  }, [params.id, navigate]);

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <h3>{task.title}</h3>
      <p>{task.dueDate}</p>
      <Button text="Go Back" onClick={() => navigate(-1)} />
    </div>
  );
};

export default TaskDetails;
