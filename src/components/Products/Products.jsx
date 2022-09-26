import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  fetchDeleteProduct,
  setIsShow,
  addInBusket,
} from "../../redux/slices/productsSlice";
import { Button } from "../Button/Button";
import { Product } from "../Product/Product";
import { Modal } from "../Modal/Modal";
import { Alert } from "../Alert.jsx/Alert";
import s from "./products.module.scss";

export const Products = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { products, status, isShow, error } = useAppSelector(
    (state) => state.productsSlice
  );
  const dispatch = useAppDispatch();

  function deleteElem(id) {
    dispatch(fetchDeleteProduct(id));
    setShowAlert(true);
  }

  function buyProduct(id) {
    dispatch(addInBusket(id));
    setShowAlert(true);
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (isShow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      {showAlert && <Alert closed={() => setShowAlert(false)} />}
      <div className={s.products__btn}>
        <Button click={() => dispatch(setIsShow())}>Добавить продукт</Button>
        <Button>
          <Link to="/busket">Корзина</Link>
        </Button>
      </div>
      <div className={s.products__block}>
        {status === "loading" && <h2>Loading...</h2>}
        {error && <h2>Error: {error}</h2>}
        {products.map((product) => (
          <Product
            key={product.id}
            {...product}
            deleteProduct={() => deleteElem(product.id)}
            addProductInBusket={() => buyProduct(product.id)}
          />
        ))}
      </div>
      <div className={s.products__modal}>
        {isShow && <Modal setShowAlert={setShowAlert} />}
      </div>
    </>
  );
};
