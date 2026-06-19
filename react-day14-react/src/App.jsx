import Header from "./components/Header";
import Counter from "./components/counter";
import ProfileCard from "./components/profilecard";
import "./App.css";

const users = [
  {
    id: 1,
    name: "Vani Tripathi",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Loves React and clean UI design.",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    role: "Backend Developer",
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Builds APIs and breaks them too.",
  },
  {
    id: 3,
    name: "Simran Kaur",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Figma whisperer and color theory nerd.",
  },
  {
    id: 4,
    name: "Karan Verma",
    // no role passed -> will use default "Member"
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

function App() {
  return (
    <div className="App">
      <Header title="Day 14: Props, State & Effects" />

      <Counter />

      <h2 style={{ textAlign: "center" }}>Team Profiles</h2>
      <div className="profile-grid">
        {users.map((user) => (
          <ProfileCard
            key={user.id}
            name={user.name}
            role={user.role}
            avatar={user.avatar}
            bio={user.bio}
          />
        ))}
      </div>
    </div>
  );
}

export default App;