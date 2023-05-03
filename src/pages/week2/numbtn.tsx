import { useState } from "react";

const NumBtn = () => {
  const [number, setNumber] = useState(0);
  return (
    <div>
      <p>{number}</p>
      <button
        data-testid="increment"
        onClick={() => setNumber((prev) => prev + 1)}
      >
        increment
      </button>
      <button
        data-testid="decrement"
        onClick={() =>
          setNumber((prev) => {
            const result = prev - 1;
            return result < 0 ? 0 : result;
          })
        }
      >
        decrement
      </button>
    </div>
  );
};
export default NumBtn;
