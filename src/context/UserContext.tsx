import { createContext, useContext, type ReactNode } from "react";

export interface User {
  userPhoto: string;
  userName: string;
}

const currentUser: User = {
  userName: "Ana Silva",
  userPhoto:
    "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=100&h=100&fit=crop",
};

interface UserContextType {
  Loggeduser: User;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <UserContext.Provider value={{ Loggeduser: currentUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook customizado (boa prática)
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de UserProvider");
  }
  return context;
}