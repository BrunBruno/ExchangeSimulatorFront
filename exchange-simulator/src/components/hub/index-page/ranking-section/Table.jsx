import { useEffect, useRef } from "react";

import classes from "./Table.module.scss";

function Table() {
  const bastUsers = [
    { userName: "James", bestScore: "10000$", totalScore: "1000000$" },
    { userName: "Sarah", bestScore: "15000$", totalScore: "750000$" },
    { userName: "John", bestScore: "8000$", totalScore: "500000$" },
    { userName: "Emily", bestScore: "12000$", totalScore: "900000$" },
    { userName: "Michael", bestScore: "20000$", totalScore: "1500000$" },
    { userName: "Olivia", bestScore: "18000$", totalScore: "1200000$" },
    { userName: "Jacob", bestScore: "9000$", totalScore: "600000$" },
    { userName: "Emma", bestScore: "14000$", totalScore: "800000$" },
    { userName: "Matthew", bestScore: "11000$", totalScore: "700000$" },
    { userName: "Sophia", bestScore: "16000$", totalScore: "1100000$" },
  ];

  const liRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove(classes["hidden-element"]);
            observer.unobserve(entry.target);
          }, 1000);
        }
      });
    });

    if (liRefs.current) {
      liRefs.current.forEach((element) => {
        observer.observe(element);
      });
    }
  }, []);

  return (
    <div className={classes.table}>
      <div className={classes["table__header"]}>
        <ul>
          <li>No.</li>
          <li>User Name</li>
          <li>Best Score</li>
          <li>Total Score</li>
        </ul>
      </div>
      <div className={classes["table__content"]}>
        <ul>
          {bastUsers.map((user, index) => (
            <li
              key={index}
              ref={(el) => (liRefs.current[index] = el)}
              className={classes["hidden-element"]}
            >
              <span>{index + 1}.</span>
              <span>{user.userName}</span>
              <span>{user.bestScore}</span>
              <span>{user.totalScore}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Table;
