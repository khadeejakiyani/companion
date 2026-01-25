import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Main content area */}
      <main className="flex-1 pb-32">
        <Outlet />
      </main>
      
      {/* Fixed bottom navigation */}
      <Navigation />
    </div>
  );
};

export default Layout;
