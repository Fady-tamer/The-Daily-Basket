import { useContext, useState, useEffect } from "react";
import { Link } from "react-router";

// context
import { mainStore } from "../../../context/MainContext";

const OrderSummery = () => {
  const { cart } = useContext(mainStore);

  const [TotalSale, setTotalSale] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const isCartEmpty = !cart || cart.length === 0 ? true : false;

  const calcTotal = () => {
    let calculatedSale = 0;
    let calculatedSubTotal = 0;
    let calculatedFinalTotal = 0;

    cart.forEach((item) => {
      const totalP = Number(item.price) * Number(item.quantity);
      if (item.sale > 0) {
        const discount = totalP * (item.sale / 100);
        calculatedSale += discount;
      }
    });

    cart.forEach((item) => {
      const itemTotal = Number(item.price) * Number(item.quantity);
      calculatedSubTotal += itemTotal;
    });

    calculatedFinalTotal = calculatedSubTotal - calculatedSale + shippingPrice;

    setTotalSale(calculatedSale.toFixed(2));
    setSubTotal(calculatedSubTotal.toFixed(2));
    setFinalTotal(calculatedFinalTotal.toFixed(2));
  };

  useEffect(() => {
    if (!isCartEmpty) {
      calcTotal();
    } else {
      setTotalSale(0);
      setSubTotal(0);
      setFinalTotal(0);
    }
  }, [cart, shippingPrice, isCartEmpty]);

  return (
    <div className="w-full lg:w-80 shrink-0 border border-gray-200 rounded-2xl p-6 bg-white shadow-sm font-sans">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Cart Total</h2>

      {/* Subtotal */}
      <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <span className="text-gray-500 text-sm">Subtotal:</span>
        <span className="font-bold text-gray-900 text-sm">${subTotal}</span>
      </div>

      {/* totalSale */}
      {TotalSale > 0 ? (
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-500 text-sm">Sale:</span>
          <span className="font-bold text-red-500 text-sm">
            ${Number(TotalSale).toFixed(2)}
          </span>
        </div>
      ) : null}

      {/* Shipping */}
      <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <span className="text-gray-500 text-sm">Shipping:</span>
        <span className="font-bold text-gray-900 text-sm">
          {shippingPrice == 0 ? (
            <p className="text-green-500">Free</p>
          ) : (
            shippingPrice
          )}
        </span>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center py-4 mb-2">
        <span className="text-gray-600 text-base">Total:</span>
        <span className="font-bold text-gray-900 text-lg">${finalTotal}</span>
      </div>

      {/* Action Button */}
      {isCartEmpty ? (
        <button
          type="button"
          disabled
          className="block w-full py-3.5 bg-gray-300 text-white text-center font-bold text-sm rounded-full cursor-not-allowed"
        >
          Proceed to checkout
        </button>
      ) : (
        <Link
          to="/checkout"
          className="block w-full py-3.5 bg-[#00b307] hover:bg-[#009e06] text-white text-center font-bold text-sm rounded-full transition-colors duration-200 shadow-sm active:scale-[0.98]"
        >
          Proceed to checkout
        </Link>
      )}
    </div>
  );
};

export default OrderSummery;
