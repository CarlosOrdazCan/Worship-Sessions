import React from 'react';
import { useWorship } from '../../services/WorshipContext';

export default function Toast() {
    const { toast } = useWorship();

    if (!toast.visible) return null;

    const iconClass = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    }[toast.type] || 'fas fa-bell';

    return (
        <div className="toast-container">
            <div className={`toast ${toast.type}`}>
                <i className={iconClass}></i>
                <span>{toast.message}</span>
            </div>
        </div>
    );
}
