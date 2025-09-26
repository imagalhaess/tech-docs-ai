"use client";

import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, User } from "lucide-react";

export default function Header() {
  const { user, signIn, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary-600">
              Tech Docs AI
            </h1>
          </div>

          <nav className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {user.displayName}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <button
                onClick={signIn}
                className="flex items-center space-x-2 btn-primary"
              >
                <LogIn className="w-5 h-5" />
                <span>Entrar com Google</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

