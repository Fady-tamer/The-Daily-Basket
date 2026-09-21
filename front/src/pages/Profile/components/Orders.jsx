import { useContext, useEffect } from "react";
import axios from "axios";

// icons
import { FaShare } from "react-icons/fa";

// context
import { mainStore } from "../../../context/MainContext";

const Orders = () => {
  const { BASE_URL, END_POINT, token, orders, saveOrders } =
    useContext(mainStore);

  const FetchOrders = async () => {
    const res = await axios.get(`${BASE_URL}${END_POINT}?populate=orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    saveOrders(res.data.orders);
  };

  useEffect(() => {
    FetchOrders();
  }, []);

  return (
    <div className="grow p-4 border border-lg border-gray-200 rounded">
      {/* title */}
      <div className="w-full mb-4 pb-2 flex justify-between border-b border-gray-200">
        <p className="text-sm text-gray-400 font-semibold">Orders</p>
      </div>
      <div className="w-full rounded-2xl border border-[#eee] overflow-x-auto">
        <table className="w-full min-w-125 border-collapse">
          <thead>
            <tr className="text-green-500 border-b border-[#eee]">
              <th className="p-4">Order id</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Order Status</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Items</th>
            </tr>
          </thead>
          {orders.length > 0 ? (
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order.id} className="text-center">
                    <td className="p-4 font-semibold">{order.id}</td>
                    <td className="p-4 font-semibold">{order.paymentMethod}</td>
                    <td className="p-4 font-semibold">
                      <p className="w-fit mx-auto px-2 py-1 rounded  bg-amber-200 capitalize">
                        {order.orderStatus}
                      </p>
                    </td>
                    <td className="p-4 font-semibold">
                      $ {Number(order.totalAmount).toFixed(2)}
                    </td>
                    <td className="p-4 flex justify-center items-center gap-2 font-semibold cursor-pointer">
                      <p>View items</p>
                      <FaShare />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tr>
              <td className="p-4 text-center font-semibold" colSpan={5}>
                You have no Orders
              </td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
};

export default Orders;
