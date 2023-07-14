import { useEffect, useRef } from "react";

import classes from "./Games.module.scss";
import { useNavigate } from "react-router-dom";

function Games() {
  const cards = [
    {
      title: "Current Games",
      description:
        "Search for your ongoing games. You can always quit game and rejoin it whenever you want to.",
    },
    {
      title: "Available Games",
      description:
        "Find out new games, that your friends or other users have started. Search for free enter games or one that you have password to and join now!",
    },
    {
      title: "Previous Games",
      description:
        "Inspect your previous games for better performace in the future. Analize you latest strategies and take lessons form your and other mistakes.",
    },
  ];

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
  }, []);

  return (
    <div className={classes.games}>
      <div
        ref={titleRef}
        className={`${classes["section-title"]} ${classes["hidden-title"]}`}
      >
        Search for Games
      </div>
      <div className={classes.grid}>
        {cards.map((card, index) => (
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
                    <svg
                      viewBox="-4.5 0 20 20"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none">
                        <g
                          transform="translate(-305.000000, -6679.000000)"
                          fill="#fff"
                        >
                          <g transform="translate(56.000000, 160.000000)">
                            <path d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
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
