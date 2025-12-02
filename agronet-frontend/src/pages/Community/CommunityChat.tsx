
import Navbar from "../../components/Community/Com_Navbar";
import SideMenu from "../../components/Community/Sidemenu";
import MessageList from "../../components/Learning/Mail/MailList";


const CommunityChat = () => {
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
        <div className="flex flex-col space-y-5">
                {/* <div className="w-full max-w-2xl mx-auto p-4">
                  <SearchBar />
                </div> */}
                <div className="w-full max-w-2xl mx-auto">
                  <MessageList />
                </div>
        </div>
        {/* <div className="flex flex-col space-y-5">
                {/* <div className="flex justify-end w-full">
                  <LearnNav />
                </div> */}
                {/* <div className="w-full max-w-2xl mx-auto mt-19">
                  <ChatComponent />
                </div> */}
        
      </section>
    </main>
  </div>
  );
};

export default CommunityChat;
