import React from "react";

const CustomInput = ({
  value,
  onChange,
  className,
  placeholder,
  functionToSubmit,
}) => {
  const checkForEnterPress = (e) => {
    if (e.key === "Enter") {
      functionToSubmit();
    }
  };
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      onKeyDown={checkForEnterPress}
    />
  );
};

export default CustomInput;
