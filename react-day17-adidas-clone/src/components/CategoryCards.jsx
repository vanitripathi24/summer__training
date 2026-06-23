const categories = [
  "MEN",
  "WOMEN",
  "KIDS",
  "RUN READY",
  "STREET ICONS",
  "PLAY LIKE PROS",
  "SPECIAL OFFER",
];

function CategoryCards() {
  return (
    <div className="category-grid">
      {categories.map((item, index) => (
        <div
          key={index}
          className="category-card"
        >
          <img
            src={`https://picsum.photos/300/220?random=${index}`}
            alt={item}
          />

          <h3>{item}</h3>
        </div>
      ))}
    </div>
  );
}

export default CategoryCards;