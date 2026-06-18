import Header from "./components/Header";

function App() {
  const name = "Vani";
  const course = "BTech";
  const learning = "React";

  return (
    <div>
      <Header />
      <h2>Name: {name}</h2>
      <h3>Course: {course}</h3>
      <p>Learning: {learning}</p>
    </div>
  );
}

export default App;