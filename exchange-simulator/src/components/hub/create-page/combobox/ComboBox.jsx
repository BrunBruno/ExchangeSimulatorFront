import { useState } from "react";

import classes from "./ComboBox.module.scss";

function ComboBox(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option.text);
    setSelectedValue(option.value);
    setIsOpen(false);
  };

  return (
    <div className={classes.combobox}>
      <input
        type="text"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        onClick={toggleDropdown}
        readOnly
      />

      <input
        type="text"
        name={props.name}
        defaultValue={selectedValue}
        style={{ display: "none" }}
      />

      {isOpen && (
        <ul onClick={toggleDropdown}>
          {props.options.map((option, index) => (
            <li key={index} onClick={() => handleOptionSelect(option)}>
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ComboBox;
