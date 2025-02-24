
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "@/modules/UserManagement/Signup/views/SignupView";
import { Login } from "@/modules/UserManagement/Login/views/LoginView";
import { useState, useEffect } from "react";
import { AuthService } from "@/modules/UserManagement/common/services/AuthService";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const subscription = AuthService.onAuthStateChange(setIsAuthenticated);
    return () => {
      subscription.data?.subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Index /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
