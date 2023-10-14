import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { GameCards } from "../HubPageOptions";

import classes from "./Games.module.scss";

import ArrowRightSvg from "../../../Shared/svgs/ArrowRightSvg";

function Games() {
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const cardsRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === titleRef.current) {
            titleRef.current.classList.remove(classes["hidden-title"]);
          } else {
            entry.target.classList.remove(classes["hidden-card"]);
          }
          observer.unobserve(entry.target);
        }
      });
    });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    if (cardsRefs.current) {
      cardsRefs.current.forEach((element) => {
        observer.observe(element);
      });
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className={classes.games}>
      <div
        ref={titleRef}
        className={`${classes["section-title"]} ${classes["hidden-title"]}`}
      >
        Explore
      </div>
      <div className={classes.grid}>
        {GameCards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardsRefs.current[index] = el)}
            className={`${classes["grid__card"]} ${classes["hidden-card"]}`}
          >
            <div className={classes["grid__card__content"]}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button
                onClick={() => {
                  navigate(card.title.toLowerCase().replace(" ", "-"), {
                    state: { title: card.title },
                  });
                }}
              >
                <ul>
                  <li>Check Out</li>
                  <li>
                    <ArrowRightSvg />
                  </li>
                </ul>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
