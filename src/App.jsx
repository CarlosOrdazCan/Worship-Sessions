import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WorshipProvider } from './services/WorshipContext';

import AppChoiceScreen from './components/auth/AppChoiceScreen';
import LoginCard from './components/auth/LoginCard';
import HighEndIntro from './components/intro/HighEndIntro';
import AppLayout from './components/common/AppLayout';
import Toast from './components/common/Toast';

import './styles/base.css';

export default function App() {
    return (
        <WorshipProvider>
            <BrowserRouter>
                <Toast />
                <Routes>
                    <Route path="/" element={<AppChoiceScreen />} />
                    <Route path="/login" element={<LoginCard />} />
                    <Route path="/intro" element={<HighEndIntro />} />
                    <Route path="/app" element={<AppLayout />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </WorshipProvider>
    );
}
