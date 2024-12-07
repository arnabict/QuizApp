import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

export default function Answers() {
  return (
    <div className={classes.answers}>
      <Checkbox classNmae={classes.answer} text="Test answer" />
    </div>
  );
}
