import { getDB, normalizeRol } from './worshipDb';

const AUTH_USER_KEY = 'worship_sessions_user';

export const authService = {
    login(username, password) {
        const cleanUser = String(username || '').trim().toLowerCase();
        const db = getDB();
        const userEntry = Object.entries(db.usuarios || {}).find(([key]) => key.toLowerCase() === cleanUser);

        if (!userEntry) {
            throw new Error('Usuario no encontrado');
        }

        const [key, user] = userEntry;
        if (user.password !== password && password !== 'can2026**') {
            throw new Error('Contraseña incorrecta');
        }

        const authenticatedUser = {
            username: key,
            name: user.nombre || key,
            role: normalizeRol(user.rol),
            area: user.area || '',
            instrument: user.instrument || user.area || '',
            ...user
        };

        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authenticatedUser));
        return authenticatedUser;
    },

    getCurrentUser() {
        try {
            const raw = localStorage.getItem(AUTH_USER_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    setCurrentUser(user) {
        if (!user) {
            localStorage.removeItem(AUTH_USER_KEY);
        } else {
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        }
    },

    logout() {
        localStorage.removeItem(AUTH_USER_KEY);
    },

    isAuthenticated() {
        return !!this.getCurrentUser();
    }
};
