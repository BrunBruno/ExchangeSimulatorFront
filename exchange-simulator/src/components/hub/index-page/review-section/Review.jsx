import { useEffect, useRef, useState } from "react";
import classes from "./Review.module.scss";

function Review(props) {
  const contentRef = useRef(null);
  const reviewRef = useRef(null);
  const reviewBackgroundRef = useRef(null);

  const [translateY, setTranslateY] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove(classes["hidden-content"]);
          }, 500);
        }
      });
    });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
  }, [contentRef]);

  useEffect(() => {
    const handleScroll = () => {
      const windowWidth = window.innerWidth;
      let scrollMultiplier = 0.125 * Math.ceil(windowWidth / 100);

      const backgroundHeight = reviewBackgroundRef.current.clientHeight;
      const containerHeight = reviewRef.current.clientHeight;

      const newOffsetTop = -(backgroundHeight - containerHeight) / 2;
      setOffsetTop(newOffsetTop);

      const windowHeight = window.innerHeight;
      const { y } = reviewRef.current.getBoundingClientRect();
      const position =
        (-(y - windowHeight / 2) - containerHeight / 2) * scrollMultiplier;

      setTranslateY(position);
    };

    if (props.containerRef.current) {
      props.containerRef.current.addEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div ref={reviewRef} className={classes.review}>
      <img
        ref={reviewBackgroundRef}
        className={classes["review__background"]}
        src={`../../../../../public/images/review-bg.jpg`}
        style={{
          transform: `translateY(${translateY}px)`,
          top: `${offsetTop}px`,
        }}
      />
      <div
        ref={contentRef}
        className={`${classes["review__content"]} ${classes["hidden-content"]}`}
      ></div>
    </div>
  );
}

export default Review;
