export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Where Your Future Begins</h1>
        <p>
          We Believe. You Belong Here. Discover why Olivet is a place where faith
          meets calling. Take the first step today.
        </p>
        <div className="hero-buttons">
          <a href="#visit" className="btn btn-yellow">
            Schedule My Visit
          </a>
          <a href="#apply" className="btn btn-outline">
            Start My Application
          </a>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="/hero-image.jpg"
          alt="Students talking on campus"
        />
      </div>
    </section>
  );
}
