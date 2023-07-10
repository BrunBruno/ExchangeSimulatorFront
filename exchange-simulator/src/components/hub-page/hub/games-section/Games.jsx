import { useEffect, useRef } from "react";
import Card from "./Crad";
import classes from "./Games.module.scss";

function Games() {
  const cards = [
    { title: "Current Games" },
    { title: "Available Games" },
    { title: "Previous Games" },
  ];

  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        titleRef.current.classList.remove(classes["hidden-title"]);
      }
    });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div className={classes.games}>
      <div
        ref={titleRef}
        className={`${classes["section-title"]} ${classes["hidden-title"]}`}
      >
        Search for Games
      </div>
      {cards.map((card, index) => (
        <Card key={index} title={card.title} />
      ))}
    </div>
  );
}

export default Games;
