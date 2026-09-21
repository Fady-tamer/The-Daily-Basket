import { useContext, useState } from "react";

// icon
import { MdAddCircleOutline } from "react-icons/md";

// context
import { mainStore } from "../../../context/MainContext";
import ChangeAddressModel from "../../../components/Models/ChangeAddressModel";

const Address = () => {
  const { userData } = useContext(mainStore);

  const [isChangingAddress, setIsChangingAddress] = useState(false);
  return (
    <div className="p-4 flex flex-col justify-center items-center border border-lg border-gray-200 rounded">
      {/* title */}
      <div className="w-full mb-4 pb-2 flex justify-between border-b border-gray-200">
        <p className="text-sm text-gray-400 font-semibold">Address</p>
        {userData.address ? (
          <button
            onClick={() => {
              setIsChangingAddress(true);
            }}
            className="text-green-500 font-semibold cursor-pointer"
          >
            Edit
          </button>
        ) : null}
      </div>

      {/* phone */}
      <div className="pt-2">
        {userData.address ? (
          <p className="text-xs md:text-base font-bold capitalize">
            {userData.address}
          </p>
        ) : (
          <button
            onClick={() => {
              setIsChangingAddress(true);
            }}
            className="flex items-center gap-2 text-green-500 font-bold cursor-pointer"
          >
            <MdAddCircleOutline className="text-xl" />
            Add Address
          </button>
        )}
      </div>

      {/* modal */}
      {isChangingAddress && (
        <ChangeAddressModel setIsChangingAddress={setIsChangingAddress} />
      )}
    </div>
  );
};

export default Address;
