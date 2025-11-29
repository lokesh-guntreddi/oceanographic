import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { MarineAI } from "./components/MarineAI";
import { Toaster } from "./components/ui/sonner";

type Language = "en" | "ml";

interface User {
  id: string;
  email: string;
  role: "researcher" | "policymaker" | "conservationist" | "admin";
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedUser = localStorage.getItem("cmlre-user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch {
        localStorage.removeItem("cmlre-user");
      }
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("cmlre-user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("cmlre-user");
  };

  return (
    <BrowserRouter>
      <AppRoutes
        user={user}
        language={language}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Global Marine AI Chatbot */}
      <MarineAI user={user} />

      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
