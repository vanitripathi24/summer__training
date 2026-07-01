function FilterBar({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="filter-bar">

      <p>Products</p>

      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(
            e.target.value
          )
        }
      >
        <option>All</option>
        <option>Running</option>
        <option>Lifestyle</option>
        <option>Football</option>
      </select>

    </div>
  );
}

export default FilterBar;