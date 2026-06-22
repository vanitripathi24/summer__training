function SuccessCard({ name, email }) {
  return (
    <div className="success-card">
      <h2>🎉 Registration Successful!</h2>

      <p>
        <strong>Name:</strong> {name}
      </p>

      <p>
        <strong>Email:</strong> {email}
      </p>

      <p>Welcome to the React Community 🚀</p>
    </div>
  );
}

export default SuccessCard;