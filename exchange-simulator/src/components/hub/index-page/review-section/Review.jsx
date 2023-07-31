import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { baseUrl, authorization } from "../../../Shared/options/ApiOptions";

import classes from "./Review.module.scss";

import StartsIcons from "./StartsIcons";

function Review(props) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const contentRef = useRef(null);
  const reviewRef = useRef(null);
  const reviewBackgroundRef = useRef(null);

  const [translateY, setTranslateY] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  const [startsArray, setStartsArray] = useState([]);
  const [selectedStars, setSelectedStarts] = useState(0);

  // const bgImage =
  //   window.innerWidth <= 800 ? "review-bg-mobile.jpg" : "review-bg.jpg";
  const countStarts = startsArray.filter((val) => val === 1).length;

  let color;
  switch (countStarts) {
    case 5:
      color = "#66d9e8";
      break;
    case 4:
      color = "#3bc9db";
      break;
    case 3:
      color = "#22b8cf";
      break;
    case 2:
      color = "#15aabf";
      break;
    case 1:
      color = "#1098ad";
      break;
    default:
      color = "#0c8599";
      break;
  }

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
      let scrollMultiplier =
        0.1 * Math.min(2, 0.125 * Math.ceil(windowWidth / 100));

      const backgroundHeight = reviewBackgroundRef.current.clientHeight;
      const containerHeight = reviewRef.current.clientHeight;

      const newOffsetTop = -(backgroundHeight - containerHeight) / 2;
      setOffsetTop(newOffsetTop);

      const windowHeight = window.innerHeight;
      const { y } = reviewRef.current.getBoundingClientRect();
      const position = -(y - windowHeight / 2) * scrollMultiplier;

      setTranslateY(position);
    };

    if (props.containerRef.current) {
      props.containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (props.containerRef.current) {
        props.containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    setStartsArray(
      Array.from({ length: 5 }, (_, i) => (i < userInfo.review ? 1 : 0))
    );
    setSelectedStarts(userInfo.review);
  }, []);

  const onStartsSelect = (index) => {
    setStartsArray(Array.from({ length: 5 }, (_, i) => (i <= index ? 1 : 0)));
  };

  const onStarsUnSelect = () => {
    setStartsArray(
      Array.from({ length: 5 }, (_, i) => (i < selectedStars ? 1 : 0))
    );
  };

  const onMakeReview = async (index) => {
    try {
      let userReview = {
        review: index + 1,
      };

      await axios.put(
        `${baseUrl}/user/user-review`,
        userReview,
        authorization(localStorage.getItem("token"))
      );

      setSelectedStarts(userReview.review);
    } catch (err) {
      console.log(err);
    }
  };

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
      >
        <p>Do you like this content?</p>
        <p>Leave a review!</p>
        <div className={classes.stars}>
          <div
            className={classes["stars__wrap"]}
            onMouseLeave={onStarsUnSelect}
          >
            {startsArray.map((element, index) =>
              element === 0 ? (
                <StartsIcons
                  key={index}
                  name={"empty"}
                  index={index}
                  color={color}
                  onStartsSelect={onStartsSelect}
                  onMakeReview={onMakeReview}
                />
              ) : (
                <StartsIcons
                  key={index}
                  name={"full"}
                  index={index}
                  color={color}
                  onStartsSelect={onStartsSelect}
                  onMakeReview={onMakeReview}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
