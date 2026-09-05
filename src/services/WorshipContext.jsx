import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDB, saveDB, normalizeRol, defaultDB } from './worshipDb';
import { authService } from './authService';

const WorshipContext = createContext(null);

export function WorshipProvider({ children }) {
    const [db, setDbState] = useState(() => getDB());
    const [currentUser, setCurrentUserState] = useState(() => authService.getCurrentUser());
    const [activeRole, setActiveRole] = useState(() => {
        const u = authService.getCurrentUser();
        return u ? normalizeRol(u.role) : 'estudiante';
    });
    const [activeSubview, setActiveSubview] = useState('');
    const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
    const [modal, setModal] = useState({ name: null, data: null });

    useEffect(() => {
        if (currentUser) {
            setActiveRole(normalizeRol(currentUser.role));
        }
    }, [currentUser]);

    const updateDb = (updater) => {
        setDbState(prev => {
            const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
            saveDB(next);
            return next;
        });
    };

    const showToast = (message, type = 'info') => {
        setToast({ visible: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, visible: false }));
        }, 4000);
    };

    const login = (username, password) => {
        const user = authService.login(username, password);
        setCurrentUserState(user);
        setActiveRole(normalizeRol(user.role));
        showToast(`Bienvenido(a), ${user.name}`, 'success');
        return user;
    };

    const logout = () => {
        authService.logout();
        setCurrentUserState(null);
        showToast('Sesión finalizada exitosamente', 'info');
    };

    const openModal = (name, data = null) => {
        setModal({ name, data });
    };

    const closeModal = () => {
        setModal({ name: null, data: null });
    };

    return (
        <WorshipContext.Provider value={{
            db,
            updateDb,
            currentUser,
            setCurrentUser: setCurrentUserState,
            activeRole,
            setActiveRole,
            activeSubview,
            setActiveSubview,
            toast,
            showToast,
            modal,
            openModal,
            closeModal,
            login,
            logout
        }}>
            {children}
        </WorshipContext.Provider>
    );
}

export function useWorship() {
    const context = useContext(WorshipContext);
    if (!context) {
        throw new Error('useWorship must be used within a WorshipProvider');
    }
    return context;
}
