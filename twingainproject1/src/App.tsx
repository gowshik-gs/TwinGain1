import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ConsumerLogin } from './components/auth/ConsumerLogin';
import { ProducerLogin } from './components/auth/ProducerLogin';
import { ConsumerDashboard } from './components/dashboard/ConsumerDashboard';
import { ProducerDashboard } from './components/dashboard/ProducerDashboard';
import { ProductSearch } from './components/products/ProductSearch';
import { ProducerList } from './components/producers/ProducerList';
import { Cart } from './components/cart/Cart';
import { useAuthStore } from './lib/store';
import { supabase } from './lib/supabase';

function App() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  // Protected route component
  const ProtectedRoute = ({ children, allowedType }) => {
    const userType = user?.user_metadata?.type;
    
    if (!user) {
      return <Navigate to="/" />;
    }
    
    if (userType !== allowedType) {
      return <Navigate to={`/${userType}/dashboard`} />;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/consumer/login" element={<ConsumerLogin />} />
            <Route path="/producer/login" element={<ProducerLogin />} />
            <Route path="/products" element={<ProductSearch />} />
            <Route path="/producers" element={<ProducerList />} />
            <Route
              path="/consumer/dashboard"
              element={
                <ProtectedRoute allowedType="consumer">
                  <ConsumerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/producer/dashboard"
              element={
                <ProtectedRoute allowedType="producer">
                  <ProducerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute allowedType="consumer">
                  <Cart />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;