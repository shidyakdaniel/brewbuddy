import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { supabase } from '../lib/supabase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          setSession(null);
          setUser(null);
          return;
        }
        const nextSession = data?.session ?? null;
        setSession(nextSession);
        setUser(nextSession?.user ?? null);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const value = useMemo(() => {
    return {
      user,
      session,
      loading,
      signUp: async ({ email, password }) => {
        return supabase.auth.signUp({ email, password });
      },
      signIn: async ({ email, password }) => {
        return supabase.auth.signInWithPassword({ email, password });
      },
      signOut: async () => {
        return supabase.auth.signOut();
      }
    };
  }, [user, session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
