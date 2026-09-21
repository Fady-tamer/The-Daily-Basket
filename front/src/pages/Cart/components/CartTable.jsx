import { useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";

// icons
import { FaTrash } from "react-icons/fa";

// context
import { mainStore } from "../../../context/MainContext";

const CartTable = () => {
  const { BASE_URL, cartEndPoint, token, cart, saveCartItems } =
    useContext(mainStore);

  // console.log(cart);

  const handleDelete = async (id, name) => {
    try {
      const cartId = JSON.parse(localStorage.getItem("cartId"));
      const updatedCart = cart.filter((item) => item.id !== id);

      saveCartItems(updatedCart);

      await axios.put(
        `${BASE_URL}${cartEndPoint}/${cartId}`,
        { data: { items: updatedCart } },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(`${name} deleted`);
    } catch {
      toast.error(`Failed to remove ${name} from cart`);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="w-full p-8 border border-[#eee] rounded-2xl bg-white text-center text-gray-500 shadow-sm">
        Your cart is currently empty.
      </div>
    );
  }

  return (
    <div className="w-full h-fit border border-[#eee] rounded-2xl overflow-hidden bg-white shadow-sm">
      <div className="w-full max-w-full overflow-x-auto">
        <table className="w-full min-w-125 text-left border-collapse">
          <thead>
            <tr className="text-green-500 border-b border-[#eee]">
              <th className="p-4 text-center">Item</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-center">Unit Price</th>
              <th className="p-4 text-center">Total</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ id, imgUrl, name, price, quantity, sale }) => (
              <tr key={id} className="border-b border-[#eee] last:border-0">
                <td className="p-4 flex justify-center items-center gap-4">
                  <img
                    src={imgUrl}
                    alt={name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <p className="hidden md:block font-semibold">{name}</p>
                </td>

                <td className="p-4 text-center font-semibold">{quantity}</td>

                <td className="p-4 text-center font-semibold text-[#aaa]">
                  {sale > 0 ? (
                    <div className="flex justify-center gap-4">
                      <p className="line-through">{price}</p>
                      <p>{Number(price * (1 - sale / 100)).toFixed(2)}</p>
                    </div>
                  ) : (
                    price
                  )}
                </td>

                <td className="p-4 text-center font-semibold">
                  {Number(quantity * (price * (1 - sale / 100))).toFixed(2)}
                </td>

                <td className="p-4 text-center">
                  <button
                    type="button"
                    onClick={() => handleDelete(id, name)}
                    aria-label={`Remove ${name} from cart`}
                    className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartTable;
