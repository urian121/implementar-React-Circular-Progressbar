import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = ({ completedTasksCount, totalTasksCount }) => {
  return (
    <div style={{ width: "200px", height: "200px", margin: "auto" }}>
      <CircularProgressbar
        value={(completedTasksCount / totalTasksCount) * 100 || 0}
        text={`${completedTasksCount}/${totalTasksCount}`}
      />
    </div>
  );
};

export default ProgressBar;
