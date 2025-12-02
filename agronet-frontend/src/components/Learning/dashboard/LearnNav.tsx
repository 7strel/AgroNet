
import NotificationDropdown from "../../Marketplace/Notification";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const LearnNav = () => {
  const user = useSelector((state: RootState) => state.users.selectedUser);

  if (!user) return <div>Loading...</div>;
    return(
        <div className="flex items-center space-x-4">
            <NotificationDropdown />
            <img
            src={user.profile_image}
            alt="User"
            className="w-10 h-10 rounded-full"
            />
      </div>
    );
}


export default LearnNav;