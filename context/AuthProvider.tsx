import React from "react"
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { ActivityIndicator } from "react-native";

const AuthContext = React.createContext({});

export default function AuthProvider({ children }) {
    const [session, setSession] = React.useState<Session | null>(null);
    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setIsReady(true);
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, []);

    if (!isReady) return <ActivityIndicator/>
    
    return (
        <AuthContext.Provider 
            value={{session, user: session?.user, isAuthenticated: !!session?.user}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => React.useContext(AuthContext);