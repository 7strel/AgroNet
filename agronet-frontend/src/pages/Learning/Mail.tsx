import { useState } from "react";
import Sidebar from "../../components/Learning/Sidebar";
import MessageList from "../../components/Learning/Mail/MailList";
import SearchBar from "../../components/Learning/dashboard/SearchBar";
import ChatComponent from "../../components/Learning/Mail/MailChat";
import LearnNav from "../../components/Learning/dashboard/LearnNav";



const Mail = () => {

    const [activeChat] = useState(null);
    return (
        <div className="flex h-screen">
          {/* Sidebar - Fixed Width */}
          <div className="w-64 bg-gray-200">
            <Sidebar />
          </div>
      
          {/* Main Content - Flexible Section */}
          <div className="flex-1 bg-white px-5 py-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Left Panel - Search Bar and Message List */}
              <div className="flex flex-col space-y-5">
                <div className="w-full max-w-2xl mx-auto p-4">
                  <SearchBar />
                </div>
                <div className="w-full max-w-2xl mx-auto">
                  <MessageList />
                </div>
              </div>
      
              {/* Right Panel - LearnNav and ChatComponent */}
              <div className="flex flex-col space-y-5">
                <div className="flex justify-end w-full">
                  <LearnNav />
                </div>
                <div className="w-full max-w-2xl mx-auto mt-19">
                    {activeChat ? <ChatComponent activeChat={activeChat} /> : <p className="text-center">Select a chat to start messaging</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
      
}


export default Mail;