import couple from "../images/couple.png";

type HeroProps = {
  onBegin: () => void;
};

function Hero({ onBegin }: HeroProps) {
  return (
  <main
    className="app"
    style={{
      backgroundImage: `url(${couple})`,
      backgroundPosition: "center 40%",
    }}
  >
    <div className="overlay"></div>

    <div className="content">
      <p className="names">
        MATTHEW & CORBAN
      </p>

      <h1>Our Roll</h1>

      <p className="subtitle">
        There are moments we'll never see.
        <br />
        Help us capture them.
      </p>

      <button onClick={onBegin}>
        BEGIN
      </button>
    </div>
  </main>
);
}

export default Hero;