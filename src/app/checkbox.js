import { Children } from "react";

export default function Checkbox(
  isChecked,
  label,
  checkHandler,
  index
) {
  // console.log({ isChecked });
  return (
    <div>
        {Children}
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
}
