import React, { ChangeEvent } from 'react';
import { useThemeContextValue } from '../hooks/useThemeValue';

interface DatePickerProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    name: string;
}

export const DatePicker = ({ value, name, onChange }: DatePickerProps) => {
    const mode = useThemeContextValue();

    return (
        <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
            {name}:
            <input className="uniform-width" type="date" value={value} onChange={onChange} />
        </label>
    );
};
