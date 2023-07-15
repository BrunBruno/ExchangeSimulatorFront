import { useEffect, useRef, useState } from "react";
import classes from "./Footer.module.scss";

function Footer(props) {
  const footerRef = useRef(null);
  const [footerFontSize, setFooterForSize] = useState(10);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const { y } = footerRef.current.getBoundingClientRect();
      const font = -(y - windowHeight);

      if (font > 0) {
        setFooterForSize(Math.log(font) * 20);
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
      <p>Footer</p>
    </footer>
  );
}

export default Footer;
