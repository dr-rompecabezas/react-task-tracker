import Button from "./Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>
      <Button text="Go Home" onClick={() => navigate('/')} />
    </div>
  );
};

export default NotFound;
