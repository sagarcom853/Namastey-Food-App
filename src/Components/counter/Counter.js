import React from "react";
import useCounter from "./useCounter";

const CounterComponent = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div style={{display:'flex',gap:'10px'}}>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};


export default CounterComponent;
