function ProfileCard({ name, role = "Member", avatar, bio = "No bio provided." }) {
  return (
    <div style={styles.card}>
      <img
        src={avatar || "https://via.placeholder.com/80"}
        alt={name}
        style={styles.avatar}
      />
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.role}>{role}</p>
      <p style={styles.bio}>{bio}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #444",
    borderRadius: "10px",
    padding: "16px",
    width: "200px",
    textAlign: "center",
    margin: "10px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },
  name: { margin: "5px 0" },
  role: { color: "#61dafb", fontSize: "0.85rem", margin: "5px 0" },
  bio: { fontSize: "0.8rem", color: "#aaa" },
};

export default ProfileCard;