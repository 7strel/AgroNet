import Sidebar from "../../components/Learning/Sidebar";
import EditProfile from "../../components/AccountSettings/Profile";


const ProfilePage = () => {
    return (
        <div className="flex h-screen">
          {/* Sidebar - Fixed Width */}
          <div className="w-64 bg-gray-200">
            <Sidebar />
          </div>
      
          {/* Main Content - Flexible Section */}

      
              {/* Right Panel - LearnNav and ChatComponent */}
              <div className="flex flex-1 space-y-2">
                  <EditProfile />
              </div>
        </div>
      );
      
      
}


export default ProfilePage;