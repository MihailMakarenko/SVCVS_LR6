import "./Counter.css";
import { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="form-group">
      <label for={props.typeLable}>{props.Text}</label>
      <label>
        {props.countName}: {count}
      </label>
      <button
        className="ButtonCounter"
        onClick={() => setCount(count > 0 ? count - 1 : 0)}
      >
        Отнять
      </button>
      <button
        className="ButtonCounter"
        onClick={() => setCount(count < 55 ? count + 1 : 55)}
      >
        Добавить
      </button>
    </div>
  );
}

export default Counter;
