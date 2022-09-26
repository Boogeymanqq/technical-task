import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type productItem = {
  id?: string;
  title: string;
  text: string;
  price: string;
  imageUrl: string;
};

interface productsSliceState {
  products: productItem[];
  status: string;
  alertStatus: string;
  isShow: boolean;
  error: string | null;
  arrBusket: productItem[];
}

export const fetchProducts = createAsyncThunk<
  productItem[],
  undefined,
  { rejectValue: string }
>("products/fetchProducts", async function (_, { rejectWithValue }) {
  const response = await fetch(
    "https://62f8404eab9f1f8e890942aa.mockapi.io/api/test/PostArticle"
  );

  if (!response.ok) {
    return rejectWithValue("Server error");
  }

  const data = await response.json();
  return data;
});

export const fetchDeleteProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("products/fetchDeleteProduct", async function (id, { rejectWithValue }) {
  const response = await fetch(
    "https://62f8404eab9f1f8e890942aa.mockapi.io/api/test/PostArticle/" + id,
    { method: "DELETE" }
  );
  if (!response.ok) {
    return rejectWithValue("Can't delete products. Server error");
  }
  return id;
});

export const fetchAddProducts = createAsyncThunk<
  productItem,
  productItem,
  { rejectValue: string }
>(
  "products/fetchAddProducts",
  async function ({ title, text, price, imageUrl }, { rejectWithValue }) {
    const newProduct: productItem = {
      id: uuidv4(),
      title,
      text,
      price,
      imageUrl,
    };
    const response = await fetch(
      "https://62f8404eab9f1f8e890942aa.mockapi.io/api/test/PostArticle",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }
    );

    if (!response.ok) {
      return rejectWithValue("Can't add products. Server error");
    }
    return (await response.json()) as productItem;

    // dispatch(addProduct(data));
  }
);

const initialState: productsSliceState = {
  products: [],
  status: "loading",
  alertStatus: "",
  isShow: false,
  error: "",
  arrBusket: [],
};

// const handlerError = (state, action) => {
//   state.status = "error";
//   state.products = [];
//   state.error = action.payload;
// };

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // addProduct(state, action) {
    //   state.products.push(action.payload);
    //   state.alertStatus = "Вы создали товар";
    // },
    // deleteProduct(state, action) {
    //   state.products = state.products.filter(
    //     (product) => product.id !== action.payload
    //   );
    //   state.alertStatus = "Вы удалили товар";
    // },
    setIsShow(state) {
      state.isShow = !state.isShow;
    },
    addInBusket(state, action: PayloadAction<string>) {
      state.products.map((product) => {
        if (product.id === action.payload) {
          state.arrBusket.push(product);
        }
        return product;
      });
      state.alertStatus = "Вы добавили товар в корзину";
    },
  },
  // extraReducers: {
  //   [fetchProducts.pending]: (state) => {
  //     state.status = "loading";
  //     state.products = [];
  //   },
  //   [fetchProducts.fulfilled]: (state, action) => {
  //     state.status = "success";
  //     state.products = action.payload;
  //   },
  //   [fetchProducts.rejected]: handlerError,
  //   [fetchDeleteProduct.rejected]: handlerError,
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchAddProducts.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.alertStatus = "Вы создали товар";
      })
      .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        state.alertStatus = "Вы удалили товар";
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.status = "error";
      });
  },
});

export const { setIsShow, addInBusket } = productsSlice.actions;

export default productsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
