import { createContext, useContext, useState, ReactNode } from 'react';

// Simple mock user type for demo purposes
interface MockUser {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    
    // Mock signup - just simulate success
    setTimeout(() => {
      const mockUser: MockUser = {
        id: 'demo-user-' + Date.now(),
        email,
        user_metadata: {
          full_name: fullName,
        },
      };
      setUser(mockUser);
      setLoading(false);
    }, 1000);

    return { data: { user: { email } }, error: null };
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Mock signin - just simulate success
    setTimeout(() => {
      const mockUser: MockUser = {
        id: 'demo-user-' + Date.now(),
        email,
        user_metadata: {
          full_name: email.split('@')[0],
        },
      };
      setUser(mockUser);
      setLoading(false);
    }, 1000);

    return { data: { user: { email } }, error: null };
  };

  const signOut = async () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};