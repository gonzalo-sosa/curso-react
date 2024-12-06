import { useState } from "react";
import useDocumentTitle from "./useDocumentTitle";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useDocumentTitle(`${name} has clicked ${count} times!`);

  return (
    <>
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name..."
      />
      <div>Counter : {count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  );
};

export default Counter;
