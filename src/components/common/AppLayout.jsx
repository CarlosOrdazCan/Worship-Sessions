import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWorship } from '../../services/WorshipContext';
import Sidebar from './Sidebar';
import Header from './Header';
import ModalManager from '../modals/ModalManager';
import Toast from './Toast';

import AdminDashboard from '../views/admin/AdminDashboard';
import PastorDashboard from '../views/pastor/PastorDashboard';
import MaestroDashboard from '../views/maestro/MaestroDashboard';
import ProduccionView from '../views/produccion/ProduccionView';
import AdoracionView from '../views/adoracion/AdoracionView';
import EstudianteView from '../views/estudiante/EstudianteView';

import '../../styles/layout.css';
import '../../styles/views.css';

export default function AppLayout() {
    const { currentUser, activeRole } = useWorship();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    const renderRoleView = () => {
        switch (activeRole) {
            case 'admin':
                return <AdminDashboard />;
            case 'pastor':
                return <PastorDashboard />;
            case 'maestro':
                return <MaestroDashboard />;
            case 'administracion':
            case 'produccion':
                return <ProduccionView />;
            case 'adoracion':
                return <AdoracionView />;
            case 'estudiante':
            default:
                return <EstudianteView />;
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Header />
                <div className="app-view-container">
                    {renderRoleView()}
                </div>
            </main>
            <ModalManager />
            <Toast />
        </div>
    );
}
