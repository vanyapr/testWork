import React, {KeyboardEvent, MouseEvent, ReactElement} from "react";
import {IButtonProps} from "@interface/IButtonProps";

export default function Button({onClick, className, isDataLoading}: IButtonProps): ReactElement {
  // Такая функция в любом случае понадобится в будущем
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>): void => {
    onClick(event);
  };

  return (
    <button className={className} type="button" onClick={handleButtonClick} onKeyDown={handleButtonClick}>
      {isDataLoading ? 'Wait please' : 'Get random user'}
    </button>
  );
}
