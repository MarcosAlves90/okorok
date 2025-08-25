'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

type User = Record<string, unknown> | null;

type UserContextType = {
    user: User;
    setUser: (u: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const STORAGE_KEY = 'okorok_user';

    const [user, setUser] = useState<User>(null);

    // carregar usuário salvo
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                setUser(JSON.parse(raw));
            }
        } catch (err) {
            // falha silenciosa
            void err;
        }
    }, []);

    const handleSetUser = (u: User) => {
        setUser(u);
        try {
            if (u) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (err) {
            // falha silenciosa
            void err;
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser: handleSetUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUser deve ser usado dentro de UserProvider');
    return ctx;
}
