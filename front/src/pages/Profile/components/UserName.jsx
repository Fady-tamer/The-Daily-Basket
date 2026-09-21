import { useContext, useEffect, useState } from "react";

// context
import { mainStore } from "../../../context/MainContext";
import ChangeUserNameModel from "../../../components/Models/ChangeUserNameModel";

const UserName = () => {
  const { userData } = useContext(mainStore);

  const [userImg, setUserImg] = useState(
    userData.username.slice(0, 2).toUpperCase(),
  );
  const [isChangingUserName, setIsChangingUserName] = useState(false);

  return (
    <div className="grow p-4 flex flex-col border border-lg border-gray-200 rounded">
      {/* title */}
      <div className="w-full mb-4 pb-2 flex justify-between border-b border-gray-200">
        <p className="text-sm text-gray-400 font-semibold">User</p>
        <button
          onClick={() => {
            setIsChangingUserName(true);
          }}
          className="text-green-500 font-semibold cursor-pointer"
        >
          Edit
        </button>
      </div>

      <div className="grow flex flex-col justify-center items-center">
        {/* user Img */}
        <div className="w-20 h-20 p-5 border-2  border-white rounded-full bg-green-200 text-3xl font-bold">
          {userImg}
        </div>

        {/* user name */}
        <div className="pt-2 flex">
          <p className="text-xs md:text-base font-bold capitalize">
            {userData?.username}
          </p>
          <p className="text-xs md:text-base font-bold capitalize">
            {userData?.lastname}
          </p>
        </div>

        {/* role */}
        <div className="flex">
          <p className="text-center text-sm text-gray-400">Customer</p>
        </div>
      </div>

      {/* modal */}
      {isChangingUserName && (
        <ChangeUserNameModel setIsChangingUserName={setIsChangingUserName} />
      )}
    </div>
  );
};

export default UserName;
