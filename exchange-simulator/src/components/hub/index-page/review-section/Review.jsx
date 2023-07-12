import { useEffect, useRef, useState } from "react";
import classes from "./Review.module.scss";

function Review(props) {
  const windowWidth = window.innerWidth;
  const imageUrl = windowWidth < 800 ? "review-bg-mobile.jpg" : "review-bg.jpg";

  const contentRef = useRef(null);
  const reviewRef = useRef(null);
  const reviewBackgroundRef = useRef(null);

  const [scrollY, setScrollY] = useState(0);
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
      const scrollPosition = props.containerRef.current.scrollTop;
      setScrollY(scrollPosition);
    };

    if (props.containerRef.current) {
      props.containerRef.current.addEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const backgroundHeight = reviewBackgroundRef.current.clientHeight;
    const containerHeight = reviewRef.current.clientHeight;

    const newOffsetTop = -(backgroundHeight - containerHeight) / 2;
    setOffsetTop(newOffsetTop);

    const windowHeight = window.innerHeight;
    const { y } = reviewRef.current.getBoundingClientRect();
    const position = (y - windowHeight / 2) / 5;

    let newTranslateY;
    if (position >= 0) {
      newTranslateY = Math.min(position, -offsetTop - 1);
    } else {
      newTranslateY = Math.max(position, offsetTop + 1);
    }

    setTranslateY(newTranslateY);
  }, [scrollY]);

  return (
    <div ref={reviewRef} className={classes.review}>
      <img
        ref={reviewBackgroundRef}
        className={classes["review__background"]}
        src={`../../../../../public/images/${imageUrl}`}
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
