import { useContext, useEffect, useState } from "react";
import { Field, useFormikContext } from "formik";

// context
import { mainStore } from "../../../context/MainContext";

const PaymentMethod = () => {
  const { cart } = useContext(mainStore);
  const { isSubmitting } = useFormikContext();

  const [TotalSale, setTotalSale] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const isCartEmpty = !cart || cart.length === 0;

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
  }, []);

  return (
    <div className="w-full md:w-4/12 p-5 flex flex-col gap-4 rounded-2xl border border-gray-100 shadow-sm bg-white sticky top-4">
      <p className="text-xl font-semibold text-gray-800">Order Summary</p>

      {/* Cart Items List */}
      <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
        {isCartEmpty ? (
          <p className="text-sm text-gray-400">Your cart is empty.</p>
        ) : (
          cart.map(({ id, imgUrl, name, quantity, price }) => (
            <div key={id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <img
                  src={imgUrl}
                  alt={name}
                  className="w-10 h-10 rounded-xl object-cover border border-gray-100"
                />
                <div>
                  <p className="font-semibold text-gray-800 line-clamp-1">
                    {name}
                  </p>
                  <p className="text-gray-400 text-xs">Qty: {quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900">${price * quantity}</p>
            </div>
          ))
        )}
      </div>

      {/* Price Breakdown */}
      <div className="flex flex-col gap-2 pt-3 border-t border-gray-100 text-sm">
        <div className="flex justify-between items-center text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">${subTotal}</span>
        </div>

        {/* totalSale */}
        {TotalSale > 0 ? (
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <span className="text-gray-500 text-sm">Sale:</span>
            <span className="font-bold text-red-500 text-sm">
              ${Number(TotalSale).toFixed(2)}
            </span>
          </div>
        ) : null}

        <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-gray-600">
          <span>Shipping</span>
          <span className="text-green-500 font-semibold">
            {shippingPrice === 0 ? "Free" : `$${shippingPrice}`}
          </span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">${finalTotal}</span>
        </div>
      </div>

      {/* Payment Options */}
      <p className="text-xl font-semibold text-gray-800 pt-2 border-t border-gray-100">
        Payment Method
      </p>

      <div className="flex flex-col gap-2.5 text-sm text-gray-700">
        <label className="flex items-center gap-2 cursor-pointer">
          <Field
            type="radio"
            name="paymentMethod"
            value="cash"
            className="w-4 h-4 accent-green-500 cursor-pointer"
          />
          Cash on Delivery
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <Field
            type="radio"
            name="paymentMethod"
            value="card"
            className="w-4 h-4 accent-green-500 cursor-pointer"
          />
          Visa / MasterCard
        </label>
      </div>

      {/* Submit Trigger */}
      <button
        type="submit"
        disabled={isSubmitting || isCartEmpty}
        className="w-full py-3 mt-2 rounded-xl text-white font-semibold bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default PaymentMethod;
