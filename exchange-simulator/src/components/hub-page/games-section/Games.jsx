import Card from "./Crad";
import classes from "./Games.module.scss";

function Games() {
  const cards = [
    { title: "Current Games" },
    { title: "Available Games" },
    { title: "Previous Games" },
  ];

  return (
    <div className={classes.games}>
      {cards.map((card, index) => (
        <Card key={index} title={card.title} />
      ))}
    </div>
  );
}

export default Games;
