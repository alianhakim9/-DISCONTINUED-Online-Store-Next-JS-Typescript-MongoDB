"use client";

import { useState } from "react";

interface ICheckboxProps {
  name: string;
}

const CheckBox = ({ name }: ICheckboxProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="my-5">
      <input
        type="checkbox"
        id={`${name}-checkbox`}
        name={name}
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
        className="checkbox"
      />
    </div>
  );
};

export default CheckBox;
