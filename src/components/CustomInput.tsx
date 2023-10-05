import React, { ChangeEvent } from 'react';
import { useThemeContextValue } from '../hooks/useThemeValue';

interface CustomInputProps<T> {
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: T
    name: string;
}

export const CustomInput = ({ value,name,onChange }: CustomInputProps<string | number>) => {
    const mode = useThemeContextValue();

    return (
        <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
            {name}:
            <input className="uniform-width" type="text" value={value} onChange={onChange}/>
        </label>
    );
};
