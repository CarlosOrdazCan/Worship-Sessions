import React, { useState, useRef, useEffect } from 'react';

export default function CustomDatePicker({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Parse value (YYYY-MM-DD) or default to today
    const parsedDate = value ? new Date(value + 'T00:00:00') : new Date();
    
    const [viewYear, setViewYear] = useState(parsedDate.getFullYear());
    const [viewMonth, setViewMonth] = useState(parsedDate.getMonth());

    useEffect(() => {
        if (value) {
            const d = new Date(value + 'T00:00:00');
            setViewYear(d.getFullYear());
            setViewMonth(d.getMonth());
        }
    }, [value]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const MESES = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const DIAS_SEMANA = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

    const handlePrevMonth = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(v => v - 1);
        } else {
            setViewMonth(v => v - 1);
        }
    };

    const handleNextMonth = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(v => v + 1);
        } else {
            setViewMonth(v => v + 1);
        }
    };

    const handleSelectDay = (dayNum) => {
        const mm = String(viewMonth + 1).padStart(2, '0');
        const dd = String(dayNum).padStart(2, '0');
        const dateStr = `${viewYear}-${mm}-${dd}`;
        onChange(dateStr);
        setIsOpen(false);
    };

    const handleSelectToday = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        const todayStr = `${y}-${m}-${d}`;
        setViewYear(y);
        setViewMonth(today.getMonth());
        onChange(todayStr);
        setIsOpen(false);
    };

    // Calculate days grid
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const totalDaysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const totalDaysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    // Format display date: "07 de Septiembre, 2026"
    const displayMonthName = MESES[parsedDate.getMonth()];
    const displayFormatted = `${parsedDate.getDate()} de ${displayMonthName}, ${parsedDate.getFullYear()}`;

    // Selected date components for comparison
    const selectedYear = parsedDate.getFullYear();
    const selectedMonth = parsedDate.getMonth();
    const selectedDay = parsedDate.getDate();

    const todayDate = new Date();
    const isTodayYear = todayDate.getFullYear() === viewYear;
    const isTodayMonth = todayDate.getMonth() === viewMonth;
    const todayDay = todayDate.getDate();

    return (
        <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
            {/* TRIGGER BUTTON */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'linear-gradient(135deg, #161822, #1f2330)',
                    border: '1px solid rgba(255, 69, 0, 0.4)',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                }}
            >
                <i className="fas fa-calendar-alt" style={{ color: '#ff4500', fontSize: '1.05rem' }}></i>
                <span>{displayFormatted}</span>
                <i className="fas fa-chevron-down" style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '4px' }}></i>
            </button>

            {/* POPOVER CALENDAR DIALOG */}
            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: 0,
                        zIndex: 9999,
                        width: '320px',
                        background: '#121420',
                        border: '1px solid rgba(255, 69, 0, 0.5)',
                        borderRadius: '18px',
                        padding: '18px',
                        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 69, 0, 0.15)',
                        backdropFilter: 'blur(12px)',
                        animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* CALENDAR HEADER (MONTH/YEAR & ARROWS) */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <button
                            type="button"
                            onClick={handlePrevMonth}
                            style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#ffffff',
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <i className="fas fa-chevron-left" style={{ fontSize: '0.8rem' }}></i>
                        </button>

                        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.02em' }}>
                            {MESES[viewMonth]} {viewYear}
                        </span>

                        <button
                            type="button"
                            onClick={handleNextMonth}
                            style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#ffffff',
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <i className="fas fa-chevron-right" style={{ fontSize: '0.8rem' }}></i>
                        </button>
                    </div>

                    {/* DAYS OF WEEK HEADER */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px' }}>
                        {DIAS_SEMANA.map((d, i) => (
                            <span key={d} style={{ fontSize: '0.78rem', fontWeight: 700, color: i === 0 || i === 6 ? '#ef4444' : '#94a3b8' }}>
                                {d}
                            </span>
                        ))}
                    </div>

                    {/* DAYS GRID */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                        {/* PREV MONTH DAYS */}
                        {[...Array(firstDayIndex)].map((_, idx) => {
                            const prevDayNum = totalDaysInPrevMonth - firstDayIndex + idx + 1;
                            return (
                                <div
                                    key={`prev_${idx}`}
                                    style={{
                                        height: '36px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#475569',
                                        fontSize: '0.85rem',
                                        opacity: 0.4
                                    }}
                                >
                                    {prevDayNum}
                                </div>
                            );
                        })}

                        {/* CURRENT MONTH DAYS */}
                        {[...Array(totalDaysInMonth)].map((_, idx) => {
                            const dayNum = idx + 1;
                            const isSelected = selectedYear === viewYear && selectedMonth === viewMonth && selectedDay === dayNum;
                            const isToday = isTodayYear && isTodayMonth && todayDay === dayNum;

                            return (
                                <button
                                    key={`day_${dayNum}`}
                                    type="button"
                                    onClick={() => handleSelectDay(dayNum)}
                                    style={{
                                        height: '36px',
                                        borderRadius: '10px',
                                        border: isSelected ? 'none' : isToday ? '1px solid #ff4500' : '1px solid transparent',
                                        background: isSelected
                                            ? 'linear-gradient(135deg, #ff4500, #dc2626)'
                                            : isToday
                                            ? 'rgba(255, 69, 0, 0.15)'
                                            : 'rgba(255, 255, 255, 0.03)',
                                        color: isSelected ? '#ffffff' : isToday ? '#ff4500' : '#e2e8f0',
                                        fontWeight: isSelected || isToday ? 800 : 600,
                                        fontSize: '0.88rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: isSelected ? '0 4px 12px rgba(255, 69, 0, 0.4)' : 'none',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    {dayNum}
                                </button>
                            );
                        })}
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <button
                            type="button"
                            onClick={handleSelectToday}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#ff4500',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '4px 8px'
                            }}
                        >
                            <i className="fas fa-bullseye" style={{ marginRight: '4px' }}></i> Ir a Hoy
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#94a3b8',
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                padding: '4px 8px'
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
