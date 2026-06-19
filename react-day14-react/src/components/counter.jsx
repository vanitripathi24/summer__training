import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // Side effect: runs whenever `count` changes
  useEffect(() => {
    document.title = `Count: ${count}`;

    // Cleanup function: runs when component unmounts
    // or before the effect runs again
    return () => {
      document.title = "React App";
    };
  }, [count]); // dependency array — effect re-runs only when count changes

  return (
    <div style={styles.card}>
      <h2>Interactive Counter</h2>
      <p style={styles.count}>{count}</p>
      <div style={styles.buttons}>
        <button onClick={() => setCount((prev) => prev - 1)}>−</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
      <p style={styles.hint}>Check your browser tab title 👆</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #444",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    width: "250px",
    margin: "20px auto",
  },
  count: { fontSize: "2.5rem", margin: "10px 0" },
  buttons: { display: "flex", justifyContent: "center", gap: "10px" },
  hint: { fontSize: "0.8rem", color: "#888", marginTop: "10px" },
};

export default Counter;