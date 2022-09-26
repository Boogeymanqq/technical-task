import React from "react";
import s from "./button.module.scss";

interface btnProps {
  children: string | any;
  click?: () => void;
}

export const Button: React.FC<btnProps> = ({ children, click }) => {
  return (
    <button className={s.btn} onClick={click}>
      {children}
    </button>
  );
};
