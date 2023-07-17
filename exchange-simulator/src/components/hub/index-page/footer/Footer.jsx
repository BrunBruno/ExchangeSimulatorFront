import { useEffect, useRef, useState } from "react";
import classes from "./Footer.module.scss";

function Footer(props) {
  const footerRef = useRef(null);
  const [footerFontSize, setFooterForSize] = useState(10);

  useEffect(() => {
    const handleScroll = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const { y } = footerRef.current.getBoundingClientRect();
      const font = -(y - windowHeight);

      if (font > 0) {
        setFooterForSize(
          5 * Math.log(font) * (1 / (1 + Math.exp(-(windowWidth / 1000))))
        );
      }
    };

    if (props.containerRef.current) {
      props.containerRef.current.addEventListener("scroll", handleScroll);
    }
  }, []);
  return (
    <footer
      ref={footerRef}
      className={classes.footer}
      style={{
        fontSize: `${footerFontSize}px`,
      }}
    >
      <div className={classes["footer__header"]}>
        <h2>Exchange Simulator</h2>
        <svg
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="#0b7285"
          height={footerFontSize}
        >
          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm3.295 3.995V11H4.104V5.995h-1.7V5H7v.994H5.295zM8.692 7.01V11H7.633V5.001h1.209l1.71 3.894h.039l1.71-3.894H13.5V11h-1.072V7.01h-.057l-1.42 3.239h-.773L8.75 7.008h-.058z" />
        </svg>
      </div>

      <div className={classes["footer__grid"]}>
        <div className={classes["footer__grid__column"]}>
          <h4>Disclaimer</h4>
          <p
            style={{
              fontSize: `${footerFontSize / 2}px`,
            }}
          >
            This exchange simulator is designed for educational and
            informational purposes only. The data provided here does not
            represent real-world exchange rates or financial advice. Any trading
            decisions made based on the simulator's results are at your own
            risk. Always consult with a qualified financial advisor before
            making any investment or trading decisions in the real market.
          </p>
        </div>
        <div className={classes["footer__grid__column"]}>
          <h4>Privacy Policy</h4>
          <p
            style={{
              fontSize: `${footerFontSize / 2}px`,
            }}
          >
            We respect your privacy. Any personal information collected on this
            platform is used solely for the purpose of providing the exchange
            simulation service. We do not share your data with third parties
            without your consent.
          </p>
        </div>
        <div className={classes["footer__grid__column"]}>
          <h4>Conatact Details</h4>
          <p
            style={{
              fontSize: `${footerFontSize / 2}px`,
            }}
          >
            If you have any questions or concerns regarding the exchange
            simulator or any other inquiries, feel free to contact our support
            team at support@exchangesimulator.com.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
