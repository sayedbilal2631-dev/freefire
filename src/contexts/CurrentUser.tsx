import { onAuthStateChanged, type User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth } from '../firebase';

interface CurrentUserContextValue {
  user: User | null;
}

const CurrentUserContext = createContext<CurrentUserContextValue>({ user: null });

interface CurrentUserProviderProps {
  children: ReactNode;
}

const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <CurrentUserContext.Provider value={{ user }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);

export default CurrentUserProvider;