import React, { useState } from "react";

const App = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e, num) => {
    const value = e.target.value;

    // Reset result when numeric input changes
    setResult(null);

    // Validate the input (basic validation for demonstration)
    if (!value.trim().match(/^(\-|\+)?([0-9]+(\.[0-9]+)?)$/)) {
      setError("Invalid input. Please enter a valid number.");
    } else {
      setError(null);
      num === 1 ? setNum1(value) : setNum2(value);
    }
  };

  const handleOperation = (operation) => {
    // Check if both num1 and num2 are empty
    if (num1.trim() === "" && num2.trim() === "") {
      setError("Please enter values for both numbers.");
      return;
    }

    // Check if either num1 or num2 is empty
    if (num1.trim() === "" || num2.trim() === "") {
      setError(`${num1.trim() === "" ? "Num1" : "Num2"} is empty. Please enter a value.`);
      return;
    }

    // Basic arithmetic operations
    switch (operation) {
      case "+":
        setResult(parseFloat(num1) + parseFloat(num2));
        break;
      case "-":
        setResult(parseFloat(num1) - parseFloat(num2));
        break;
      case "*":
        setResult(parseFloat(num1) * parseFloat(num2));
        break;
      case "/":
        // Check for division by zero
        if (parseFloat(num2) === 0) {
          setError("Cannot divide by zero.");
          setResult(null);
        } else {
          setResult(parseFloat(num1) / parseFloat(num2));
          setError(null);
        }
        break;
      default:
        break;
    }

    // Reset input values after calculation
    setNum1("");
    setNum2("");
  };

  const handleBackspace = (num) => {
    num === 1 ? setNum1(num1.slice(0, -1)) : setNum2(num2.slice(0, -1));
  };

  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <div>
        <input
          type="text"
          placeholder="Num1"
          value={num1}
          onChange={(e) => handleInputChange(e, 1)}
          onKeyDown={(e) => e.key === "Backspace" && handleBackspace(1)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Num2"
          value={num2}
          onChange={(e) => handleInputChange(e, 2)}
          onKeyDown={(e) => e.key === "Backspace" && handleBackspace(2)}
        />
      </div>
      <div id="inner-box">
        <div className="sign" onClick={() => handleOperation("+")}>+</div>
        <div className="sign" onClick={() => handleOperation("-")}>-</div>
        <div className="sign" onClick={() => handleOperation("*")}>*</div>
        <div className="sign" onClick={() => handleOperation("/")}>/</div>
      </div>
      {error && <div className="message error">{error}</div>}
      {result !== null && <div className="message success">Result: {result}</div>}
    </div>
  );
};

export default App;


