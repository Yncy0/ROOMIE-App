import React, { PropsWithChildren } from "react";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { ActivityIndicator } from "react-native";

type AuthContextType = {
  session: Session | null;
  user: Session["user"] | null;
  isAuthenticated: boolean;
};

const AuthContext = React.createContext<AuthContextType>({
  session: null,
  user: null,
  isAuthenticated: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = React.useState<Session | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const fetchSession = async () => {
      await supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setIsReady(true);
        console.log(session);
      });
    };

    fetchSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isReady) return <ActivityIndicator />;

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user || null,
        isAuthenticated: !!session?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
