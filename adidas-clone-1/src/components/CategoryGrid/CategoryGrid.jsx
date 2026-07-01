import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import './CategoryGrid.css';

export default function CategoryGrid() {
  return (
    <section className="category-section">
      <div className="section-header">
        <h2 className="section-title">Shop by Category</h2>
        <Link to="/home" className="section-link">View All</Link>
      </div>

      <div className="category-grid">
        {categories.map((cat) => (
          <Link to="/home" className="category-card" key={cat.id}>
            <img src={cat.image} alt={cat.title} loading="lazy" />
            <div className="category-card-overlay" />
            <div className="category-card-content">
              <h3>{cat.title}</h3>
              <p>{cat.subtitle}</p>
              <span className="category-shop-btn">Shop Now</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
