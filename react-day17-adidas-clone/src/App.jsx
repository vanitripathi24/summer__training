import Navbar from "./components/Navbar";
import PageHeader from "./components/PageHeader";
import CategoryCards from "./components/CategoryCards";
import FilterBar from "./components/FilterBar";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import Feedback from "./components/Feedback";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <PageHeader />

      <CategoryCards />

      <FilterBar />

      <ProductGrid />

      <Feedback />

      <Footer />
    </>
  );
}

export default App;