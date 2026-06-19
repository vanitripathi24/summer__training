function Header({ title = "Day 14: React Hooks" }) {
  return (
    <header style={{ textAlign: "center", padding: "20px" }}>
      <h1>{title}</h1>
      <p>Props • useState • useEffect</p>
    </header>
  );
}

export default Header;