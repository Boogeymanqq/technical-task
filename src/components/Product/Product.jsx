import React from "react";
import s from "./product.module.scss";

export const Product = ({
  title,
  price,
  imageUrl,
  text,
  deleteProduct,
  addProductInBusket,
}) => {
  return (
    <div className={s.product__block}>
      <p>Название: {title}</p>
      <p>Цена: {price}</p>
      <img src={imageUrl} alt="photos" />
      <p>{text}</p>
      <div className={s.product__btn}>
        <button onClick={deleteProduct}>Удалить</button>
        <button onClick={addProductInBusket}>Kупить</button>
      </div>
    </div>
  );
};
