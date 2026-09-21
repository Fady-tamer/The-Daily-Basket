import { useState } from "react";

// components
import ChangePasswordModel from "../../../components/Models/ChangePasswordModel";

const Password = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <div className="p-4 flex flex-col justify-center items-center border border-lg border-gray-200 rounded">
      {/* title */}
      <div className="w-full mb-4 pb-2 flex justify-between border-b border-gray-200">
        <p className="text-sm text-gray-400 font-semibold">Password</p>
        <button
          onClick={() => {
            setIsChangingPassword(true);
          }}
          className="text-green-500 font-semibold cursor-pointer"
        >
          Change Password
        </button>
      </div>

      {/* password */}
      <p className="text-2xl tracking-widest leading-none font-bold select-none">
        ••••••••
      </p>

      {/* modal */}
      {isChangingPassword && (
        <ChangePasswordModel setIsChangingPassword={setIsChangingPassword} />
      )}
    </div>
  );
};

export default Password;
