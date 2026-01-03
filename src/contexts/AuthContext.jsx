import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     INITIAL SESSION LOAD
  ========================= */
  useEffect(() => {
    // Get current logged-in user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* =========================
     AUTH FUNCTIONS
  ========================= */
  async function signup(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    // Create user profile row
    await supabase.from("users").insert({
      id: data.user.id,
      name,
      email,
    });
  }

  async function login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null); // ✅ CRITICAL FIX
  }

  const value = {
    user,
    signup,
    login,
    logout,
    isAuthenticated: !!user, // ✅ THIS FIXES NAVBAR
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
