"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import copyIcon from "../app/assets/img/icon-copy.svg";
import checkIcon from "../app/assets/img/icon-check.svg";
import arrowIcon from "../app/assets/img/icon-arrow-right.svg";

const allInclusions = [
  {
    name: "Include Uppercase Letters",
    checked: false,
    value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  {
    name: "Lowercase Letters",
    checked: true,
    value: "abcdefghijklmnopqrstuvwxyz",
  },
  { name: "Include Numbers", checked: false, value: "0123456789" },
  {
    name: "Include Symbols",
    checked: false,
    value: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
  },
];
export const Checkbox = ({
  isChecked,
  label,
  checkHandler,
  index,
  classes,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
        className="w-5 h-5 text-xl text-bright-gray mr-4 accent-controls-green p-3"
      />
      <label htmlFor={`checkbox-${index}`}>{label}</label>
    </div>
  );
};

export default function Home() {
  const [charLength, setCharLength] = useState(8);
  const [strength, setStrength] = useState(0);
  const [inclusions, setInclusions] = useState(allInclusions);
  const [password, setPassword] = useState("P4$5W0rD!");
  const [selectedValues, setSelectedValues] = useState([]);
  const [copyToClipboard, setCopyToClipboard] = useState(copyIcon);

  /**
   * Updates the check status of an inclusion at the specified index.
   *
   * @param {number} index - The index of the inclusion to update.
   * @return {void}
   */

  const updateCheckStatus = (index) => {
    setInclusions(
      inclusions.map((inclusion, currentIndex) =>
        currentIndex === index
          ? { ...inclusion, checked: !inclusion.checked }
          : inclusion
      )
    );

    setSelectedValues(
      inclusions
        .filter((inclusion) => inclusion.checked)
        .map((inclusion) => inclusion.value)
        .join("")
    );
  };

  /**
   * Selects all items in the inclusions array by setting the 'checked' property
   * of each item to true.
   *
   * @param {undefined} None
   * @return {undefined} None
   */
  const selectAll = () => {
    setInclusions(
      inclusions.map((inclusion) => ({ ...inclusion, checked: true }))
    );
  };
  const unSelectAll = () => {
    setInclusions(
      inclusions.map((inclusion) => ({ ...inclusion, checked: false }))
    );
  };

  /**
   * Sets the selected values based on the checked items in the inclusions array.
   *
   *
   */
  useEffect(() => {
    setSelectedValues(
      inclusions
        .filter((inclusion) => inclusion.checked)
        .map((inclusion) => inclusion.value)
        .join("")
    );
  }, [inclusions, charLength]);

  /**
   * Generates a random password based on the given criteria.
   *
   * @return {void} Sets the generated password as the value of the password state.
   */
  const generatePassword = () => {
    let randomPassword = "";
    const randomBytes = new Uint8Array(charLength);
    crypto.getRandomValues(randomBytes);
    for (let i = 0; i < charLength; i++) {
      let randomIndex = randomBytes[i] % selectedValues.length;
      randomPassword += selectedValues[randomIndex];
    }
    setPassword(randomPassword);
  };

  /**
   * Copies the password to the clipboard and fires a toast message.
   *
   * @return {string} The message indicating whether the password was successfully copied to the clipboard or if an error occurred.
   */
  const handlCopyToClipboard = () => {
    // copy the password to the clipboard & fire toast message
    navigator.clipboard
      .writeText(password.toString())
      .then(() => "Password copied to your clipboard")
      .catch(() => "Error copying password to clipboard")
      .then(toast);
  };

  /**
   * Displays a toast message.
   *
   * @param {string} message - The message to be displayed.
   * @return {void} This function does not return a value.
   */
  const toast = (message) => {
    setCopyToClipboard(checkIcon);
  };

  /**
   * Creates a timer that will run every 5 seconds.
   * The timer will change the src of the copy to clipboard icon to its original state.
   **/
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("This will run every 5 seconds!");
      setCopyToClipboard(copyIcon);
    }, 5000);
    return () => {
      clearInterval(interval);
      //
    };
  }, [copyToClipboard]);

  return (
    <main className="container">
      <div className="flex justify-center items-center background-gray-dark">
        <div className="generator card shadow-2xl p-10 flex flex-col gap-5 min-w-[540px]">
          <h2 className="text-2xl text-gray-dark text-center">
            Password Generator
          </h2>
          <p className="text-bright-gray bg-controls-background-dark-gray p-5 text-bold text-3xl whitespace-normal">
            {password.toString()}
            <span className="text-2xl controls-green float-right">
              <Image
                priority
                src={copyToClipboard}
                alt="Picture of a curved line from left to right"
                className=""
                onClick={handlCopyToClipboard}
              />
            </span>
          </p>
          <div className=" bg-controls-background-dark-gray p-5">
            <p className="text-bright-gray text-bold text-lg">
              Character Length{" "}
              <span className="text-2xl text-controls-green float-right">
                {charLength.toString()}
              </span>
            </p>
            <div className="slidecontainer mt-5 mb-5">
              <input
                type="range"
                min="8"
                max="30"
                id="myRange"
                value={charLength}
                onChange={(e) => setCharLength(e.target.value)}
                className="w-full cursor-pointer accent-controls-green"
              />
            </div>

            <div className="text-xl text-bright-gray flex flex-col gap-5 mt-3 mb-5">
              <p className="flex gap-2 justify-between font-bold">
                <button
                  className="bg-controls-green text-background-black p-3"
                  onClick={selectAll}
                >
                  Select All
                </button>
                <button
                  className="bg-controls-green text-background-black p-3"
                  onClick={unSelectAll}
                >
                  Unselect All
                </button>
              </p>
              {inclusions.map((inclusion, index) => (
                <Checkbox
                  key={inclusion.name}
                  isChecked={inclusion.checked}
                  checkHandler={() => updateCheckStatus(index)}
                  label={inclusion.name}
                  index={index}
                />
              ))}

              <div className="text-2xl text-gray-dark bg-background-black p-5 mb-3">
                Strength
                <span className="text-2xl controls-green float-right">
                  {strength.toString()}
                </span>
              </div>

              <button
                className="generate-password bg-controls-green text-background-black font-bold p-3 flex justify-center"
                onClick={generatePassword}
              >
                Generate{" "}
                <span className="ml-2 p-2">
                  <Image
                    priority
                    src={arrowIcon}
                    alt="Picture of a curved line from left to right"
                    className=""
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
