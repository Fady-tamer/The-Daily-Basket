import { createContext, useEffect, useState } from "react";
import axios from "axios";

// custom toasts
import { CustomErrorToast } from "../components/CustomToasts/CustomErrorToast";

export const mainStore = createContext();

const MainContext = ({ children }) => {
  const BASE_URL = "http://localhost:1337";
  const END_POINT = "/api/users/me";

  // end points
  const categoriesEndPoint = "/api/categories";
  const productsEndPoint = "/api/products";
  const cartEndPoint = "/api/carts";
  const wishListEndPoint = "/api/wishlists";
  const orderEndPoint = "/api/orders";

  // user data
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null,
  );
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || [],
  );
  const [wishList, setWishList] = useState(
    JSON.parse(localStorage.getItem("wishListItems")) || [],
  );
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || [],
  );
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Flags
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Load Categories and Products
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const catRes = await axios.get(`${BASE_URL}${categoriesEndPoint}`);
        setCategories(catRes.data?.data || []);

        const prodRes = await axios.get(`${BASE_URL}${productsEndPoint}`);
        setProducts(prodRes.data?.data || []);
      } catch (error) {
        CustomErrorToast("Failed to preload initial data.");
      }
    };

    fetchInitialData();
  }, [BASE_URL, token]);

  const filteredProducts =
    !selectedCategory || selectedCategory === "all"
      ? products
      : products.filter((item) => item.category_name === selectedCategory);

  const saleProducts = products.filter((product) => {
    return product.sale > 0;
  });

  const saveToken = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const saveUserData = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);
  };

  const saveCartId = (cartId) => {
    localStorage.setItem("cartId", JSON.stringify(cartId));
    setCart(cartId);
  };

  const saveCartItems = (cartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCart(cartItems);
  };

  const saveOrders = (orders) => {
    localStorage.setItem("orders", JSON.stringify(orders));
    setOrders(orders);
  };

  const saveWishListId = (WishListId) => {
    localStorage.setItem("wishListId", JSON.stringify(WishListId));
    setWishList(WishListId);
  };

  const saveWishListItems = (WishListItems) => {
    localStorage.setItem("wishListItems", JSON.stringify(WishListItems));
    setWishList(WishListItems);
  };

  const logoutFn = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("cartId");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("wishListId");
    localStorage.removeItem("wishListItems");
    localStorage.removeItem("orders");
    setToken(null);
  };

  const contextValue = {
    BASE_URL,
    END_POINT,
    categoriesEndPoint,
    productsEndPoint,
    cartEndPoint,
    wishListEndPoint,
    orderEndPoint,
    token,
    userData,
    selectedCategory,
    categories,
    filteredProducts,
    saleProducts,
    isInitialLoading,
    cart,
    wishList,
    orders,
    setSelectedCategory,
    setIsInitialLoading,
    saveToken,
    saveUserData,
    saveCartId,
    saveCartItems,
    saveWishListId,
    saveWishListItems,
    saveOrders,
    logoutFn,
  };

  return (
    <mainStore.Provider value={contextValue}>{children}</mainStore.Provider>
  );
};

export default MainContext;
