import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Home, Radio, Heart, MessageCircle, User } from "lucide-react";

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg mx-auto md:max-w-4xl relative">
        <Outlet />
      </main>

      {/* Bottom Navigation for Mobile (PWA) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 md:hidden pb-safe">
        <NavLink 
          to="/home" 
          className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-gray-400'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        <NavLink 
          to="/live" 
          className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-gray-400'}`}
        >
          <Radio className="w-6 h-6" />
          <span className="text-[10px] font-medium">Live</span>
        </NavLink>

        <NavLink 
          to="/date" 
          className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-gray-400'}`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-medium">Date</span>
        </NavLink>

        <NavLink 
          to="/matches" 
          className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-gray-400'}`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-[10px] font-medium">Matches</span>
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-gray-400'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </NavLink>
      </nav>
      
      {/* Note: In a real app we'd add a sidebar or topbar for desktop (md:flex) here */}
    </div>
  );
}
