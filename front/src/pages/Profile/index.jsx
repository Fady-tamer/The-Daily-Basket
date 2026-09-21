// components
import UserName from "./components/UserName";
import Phone from "./components/Phone";
import Address from "./components/Address";
import Password from "./components/Password";
import Orders from "./components/Orders";

const Profile = () => {
  return (
    <div className="grow min-h-[56dvh] px-4 lg:px-0 py-4 flex gap-4">
      <div className="container p-4 flex flex-col md:flex-row gap-4 rounded-2xl bg-white">
        <div className="md:w-3/12 h-full flex flex-col gap-4">
          <UserName />
          <Phone />
          <Address />
          <Password />
        </div>
        <Orders />
      </div>
    </div>
  );
};

export default Profile;
