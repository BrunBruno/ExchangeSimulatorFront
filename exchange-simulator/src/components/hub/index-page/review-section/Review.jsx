import { useEffect, useRef } from "react";
import classes from "./Review.module.scss";

function Review() {
  const contentRef = useRef(null);

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
  return (
    <div className={classes.review}>
      <div
        ref={contentRef}
        className={`${classes["review__content"]} ${classes["hidden-content"]}`}
      ></div>
    </div>
  );
}

export default Review;
