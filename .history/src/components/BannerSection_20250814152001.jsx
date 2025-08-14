export default function HeroSection() {
  return (
    <section className="banner-section">
      <div className="banner-content">
        <h1>Where Your Future Begins</h1>
        <p>
          We Believe. You Belong Here. Discover why Shajid Royal College of Nursing is a place where faith
          meets your calling. Take the first step today.
        </p>
        <div className="banner-buttons">
          <a href="#visit" className="btn btn-yellow">
            Schedule My Visit
          </a>
          <a href="#apply" className="btn btn-outline">
            Start My Application
          </a>
        </div>
      </div>

      <div className="banner-image">
        <img
          src="/hero-image.jpg"
          alt="Students talking on campus"
        />
      </div>
    </section>
  );
}
