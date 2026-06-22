import { useState } from "react";
import SuccessCard from "./SuccessCard";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("⚠ Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("⚠ Password must be at least 6 characters long");
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <div className="container">
      {isSubmitted ? (
        <SuccessCard
          name={name}
          email={email}
        />
      ) : (
        <form
          className="form-card"
          onSubmit={handleSubmit}
        >
          <h2>User Registration</h2>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {password.length > 0 && (
            <p
              className={
                password.length >= 6
                  ? "valid"
                  : "invalid"
              }
            >
              {password.length >= 6
                ? "✅ Strong Password"
                : "❌ Password must contain at least 6 characters"}
            </p>
          )}

          <button type="submit">
            Register
          </button>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;