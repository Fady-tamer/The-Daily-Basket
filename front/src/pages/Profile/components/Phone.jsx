import { useContext, useState } from "react";

// components
import ChangePhoneModel from "../../../components/Models/ChangePhoneModel";

// context
import { mainStore } from "../../../context/MainContext";
import { MdAddCircleOutline } from "react-icons/md";

const Phone = () => {
  const { userData } = useContext(mainStore);

  const [isChangingPhone, setIsChangingPhone] = useState(false);

  return (
    <div className="p-4 flex flex-col justify-center items-center border border-lg border-gray-200 rounded">
      {/* title */}
      <div className="w-full mb-4 pb-2 flex justify-between border-b border-gray-200">
        <p className="text-sm text-gray-400 font-semibold">Phone Number</p>
        <button
          onClick={() => {
            setIsChangingPhone(true);
          }}
          className="text-green-500 font-semibold cursor-pointer"
        >
          Edit
        </button>
      </div>

      {/* phone */}
      <div className="pt-2 flex">
        {userData.phone ? (
          <p className="text-xs md:text-base font-bold capitalize">
            {userData?.phone}
          </p>
        ) : (
          <button
            onClick={() => {
              setIsChangingPhone(true);
            }}
            className="flex items-center gap-2 text-green-500 font-bold cursor-pointer"
          >
            <MdAddCircleOutline className="text-xl" />
            Add Phone
          </button>
        )}
      </div>

      {/* modal */}
      {isChangingPhone && (
        <ChangePhoneModel setIsChangingPhone={setIsChangingPhone} />
      )}
    </div>
  );
};

export default Phone;
