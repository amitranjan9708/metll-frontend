import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, MapPin, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/register");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <User className="w-10 h-10 text-gray-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-8 pb-24 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Profile</h1>
        <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-500 hover:text-primary transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative bg */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-primary/10 to-rose-400/10" />
        
        <div className="relative mb-4 mt-8">
          <div className="w-28 h-28 rounded-full p-1 bg-white shadow-md">
            {user.photo ? (
              <img src={user.photo} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-400">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-6">
          <MapPin className="w-4 h-4" />
          <span>New Delhi, India</span>
        </div>

        <div className="w-full flex gap-3">
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
            Edit Profile
          </button>
          <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 shadow-sm transition-all active:scale-95">
            Add Photos
          </button>
        </div>
      </div>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="w-full bg-white text-rose-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 border border-gray-100 shadow-sm hover:bg-rose-50 active:scale-[0.98] transition-all mt-auto"
      >
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
  );
}
