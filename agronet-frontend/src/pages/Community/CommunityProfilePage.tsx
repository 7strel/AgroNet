import Navbar from "../../components/Community/Com_Navbar";
import SideMenu from "../../components/Community/Sidemenu";
import EditProfile from "../../components/AccountSettings/Profile";


const CommunityProfilePage = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
        {/* Navbar at the top */}
        <Navbar />
    
        {/* Main content section */}
        <main className="flex flex-1 overflow-hidden">
          {/* Sidebar: Categories List with scroll if needed */}
          <aside className="w-1/4 p-4 bg-gray-800 overflow-auto">
            <SideMenu />
          </aside>
    
          {/* Product List taking remaining space */}
          <section className="flex-1 p-4 overflow-auto">
            <EditProfile />
          </section>
        </main>
      </div>
      );
}


export default CommunityProfilePage;