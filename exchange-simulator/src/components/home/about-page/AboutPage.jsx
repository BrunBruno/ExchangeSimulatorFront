import { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./AboutPage.module.scss";

import Privacy from "./content-section/Privacy";
import Terms from "./content-section/Terms";
import Introduction from "./content-section/Introduction";
import Objectives from "./content-section/Objectives";

import RoundArrowRightSvg from "../../Shared/svgs/RoundArrowRightSvg";
import RoundArrowLeftSvg from "../../Shared/svgs/RoundArrowLeftSvg";

function AboutPage() {
  const pageOptions = [
    { title: "Introduction", component: <Introduction /> },
    { title: "Objectives", component: <Objectives /> },
    { title: "Terms", component: <Terms /> },
    { title: "Privacy", component: <Privacy /> },
  ];

  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState(0);

  const onSetSelectedContent = (pageNumber) => {
    setSelectedContent(pageNumber);
  };

  return (
    <div className={classes.container}>
      <div className={classes["container__column"]}>
        <div className={classes["container__column__nav"]}>
          <ul>
            {pageOptions.map((element, index) => (
              <li
                key={index}
                onClick={() => {
                  onSetSelectedContent(index);
                }}
              >
                <RoundArrowRightSvg />
                {element.title}
              </li>
            ))}
          </ul>
          <ul>
            <li
              onClick={() => {
                navigate("/");
              }}
            >
              <RoundArrowLeftSvg />
              Home Page
            </li>
          </ul>
        </div>
      </div>
      <div className={classes["container__column"]}>
        <div className={classes["container__column__content"]}>
          {pageOptions[selectedContent].component}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
