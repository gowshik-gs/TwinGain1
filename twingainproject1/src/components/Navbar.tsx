import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, LogIn } from 'lucide-react';
import { useAuthStore } from '../lib/store';
import { supabase } from '../lib/supabase';

export function Navbar() {
  const { user } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">Twin Gain</span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-primary-600">
              Products
            </Link>
            <Link to="/producers" className="text-gray-700 hover:text-primary-600">
              Producers
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600">
              About
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-primary-600">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            {user ? (
              <div className="relative group">
                <button className="text-gray-700 hover:text-primary-600">
                  <User className="w-6 h-6" />
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl hidden group-hover:block">
                  <Link
                    to={user.user_metadata?.type === 'consumer' ? '/consumer/dashboard' : '/producer/dashboard'}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <button className="text-gray-700 hover:text-primary-600">
                  <LogIn className="w-6 h-6" />
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl hidden group-hover:block">
                  <Link
                    to="/consumer/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Consumer Login
                  </Link>
                  <Link
                    to="/producer/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Producer Login
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="sm:hidden flex items-center">
            <button className="text-gray-700 hover:text-primary-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}