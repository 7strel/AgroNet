
import SidebarChat from "../../components/AI/Sidebar-chat";
import MainSection from "../../components/AI/Main-section";
// import Dashboard from "../../components/Learning/dashboard_section_two";
// import DashboardStats from "../../components/Learning/dashboard_section_three";


const AI = () => {
    return (
      <div className="flex h-screen">
        {/* Sidebar - Fixed Width */}
        <div className="w-64 bg-gray-200 absolute left-0 top-0 h-full">
          <SidebarChat />
          
        </div>
        <div className="flex-1 bg-white">
          <MainSection /> 
        </div>
        {/* Dashboard - Takes Remaining Space
        {/* <div className="flex-1 bg-white"> */}
          {/* <DashboardStats /> */}
        {/* </div>  */}
      </div>
    );
  };
  
  export default AI;
  