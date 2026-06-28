import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    // Changed "flex" to "flex-col lg:flex-row" and added "w-full"
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-background">
      
      {/* sidebar - Renders top header on mobile, slide-out drawer, and desktop side menu */}
      <Sidebar />

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Dashboard Sub-Navbar */}
        <div className="border-b border-gray-200 bg-white p-4 w-full shrink-0">
          Navbar
        </div>
        
        {/* Scrollable Page Canvas */}
        <main className="flex-1 overflow-y-auto p-5 bg-gray-50/50">
          {children}
        </main>
      </div>
      
    </div>
  );
}