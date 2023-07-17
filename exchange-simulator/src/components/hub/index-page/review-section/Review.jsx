import { useEffect, useRef, useState } from "react";
import classes from "./Review.module.scss";
import axios from "axios";
import baseUrl from "../../../Shared/Url";

function Review(props) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const contentRef = useRef(null);
  const reviewRef = useRef(null);
  const reviewBackgroundRef = useRef(null);

  const [translateY, setTranslateY] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  const [startsArray, setStartsArray] = useState([]);
  const [selectedStars, setSelectedStarts] = useState(0);

  const countOnes = startsArray.filter((val) => val === 1).length;

  let color;
  switch (countOnes) {
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

      await axios.put(`${baseUrl}/user/user-review`, userReview, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

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
                <svg
                  key={index}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseEnter={() => {
                    onStartsSelect(index);
                  }}
                >
                  <path
                    d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                    stroke={color}
                  />
                </svg>
              ) : (
                <svg
                  key={index}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseEnter={() => {
                    onStartsSelect(index);
                  }}
                  onClick={() => {
                    onMakeReview(index);
                  }}
                >
                  <path
                    d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                    fill={color}
                  />
                </svg>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
