import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { UserProfile } from "@shared/types/game";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Fetch user profile if user is logged in
  const { 
    data: user, 
    isLoading,
    isError,
    refetch
  } = useQuery<UserProfile | null>({
    queryKey: ['/api/user/profile'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return res.json();
    },
    onSuccess: () => {
      refetch();
      navigate("/");
      toast({
        title: "Success",
        description: "You are now logged in.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/register", userData);
      return res.json();
    },
    onSuccess: () => {
      refetch();
      navigate("/");
      toast({
        title: "Success",
        description: "Your account has been created.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/logout", {});
      return res.json();
    },
    onSuccess: () => {
      navigate("/login");
      queryClient.clear();
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
    },
  });

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const register = async (username: string, password: string) => {
    await registerMutation.mutateAsync({ username, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Helper function for query
function getQueryFn({ on401 }: { on401: "returnNull" | "throw" }) {
  return async ({ queryKey }: { queryKey: string[] }) => {
    try {
      const res = await fetch(queryKey[0], {
        credentials: "include",
      });

      if (res.status === 401 && on401 === "returnNull") {
        return null;
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      return res.json();
    } catch (error) {
      if (on401 === "returnNull") {
        return null;
      }
      throw error;
    }
  };
}
