import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

function About() {
  return (
    <>
      <NavBar />

      <div
        style={{
          padding: "60px",
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <h1>About Adidas</h1>

        <p>
          Adidas is one of the world's leading sportswear brands.
        </p>

        <p>
          Founded in Germany, Adidas designs footwear,
          apparel and accessories for athletes and
          everyday consumers.
        </p>

        <p>
          This Adidas Clone is built using React,
          React Router and DummyJSON API.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default About;