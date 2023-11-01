import React, { ChangeEvent } from 'react';
import { useThemeContextValue } from '../hooks/useThemeValue';

interface DatePickerProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    name: string;
}

export const DatePicker = ({ value, name, onChange }: DatePickerProps) => {
    const mode = useThemeContextValue();

    const getTodayFormatted = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    };

    return (
        <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
            {name}:
            <input className="uniform-width" type="date" value={value} onChange={onChange} min={getTodayFormatted()} />
        </label>
    );
};
