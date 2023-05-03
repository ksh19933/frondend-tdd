import { useState } from "react";

const Calculator = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  return (
    <div>
      <input
        data-testid="num1"
        type="number"
        onChange={(e) => setNum1(parseInt(e.target.value))}
      />
      <input
        data-testid="num2"
        type="number"
        onChange={(e) => setNum2(parseInt(e.target.value))}
      />
      <button data-testid="add" onClick={() => setResult(num1 + num2)}>
        +
      </button>
      <button data-testid="subtract" onClick={() => setResult(num1 - num2)}>
        -
      </button>
      <button data-testid="multiply" onClick={() => setResult(num1 * num2)}>
        *
      </button>
      <button
        data-testid="divide"
        onClick={() => setResult(+(num1 / num2).toFixed(2))}
      >
        /
      </button>
      <p>{result}</p>
    </div>
  );
};

export default Calculator;
