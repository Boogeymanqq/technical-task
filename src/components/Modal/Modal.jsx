import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../redux/hook";
import { setIsShow, fetchAddProducts } from "../../redux/slices/productsSlice";
import { Button } from "../Button/Button";
import s from "./modal.module.scss";

export const Modal = ({ setShowAlert }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [text, setText] = useState("");

  const dispatch = useAppDispatch();

  function addProducts() {
    dispatch(setIsShow());
    if (title.trim().length && price.trim().length && text.trim().length) {
      dispatch(
        fetchAddProducts({
          title,
          text,
          price,
          imageUrl: "https://source.unsplash.com/random/300x300",
        })
      );
      setShowAlert(true);
    }
    setTitle("");
    setPrice("");
    setText("");
  }

  return (
    <div className={s.modal}>
      <div className={s.modal__block}>
        <h1>Создание товара</h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Введите стоимость"
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите описание"
        />
        <Button click={addProducts}>Сохранить</Button>
      </div>
    </div>
  );
};
