import React, { ChangeEvent } from 'react';
import { useThemeContextValue } from '../hooks/useThemeValue';
import { getDefaultLanguageTextOrFallback } from '../utils';

interface SelectValue {
    value: string;
    name: Record<string, string>;
}
interface CustomInputProps<T> {
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    selectedValue: T;
    values: SelectValue[];
    name: string;
}

export const CustomSelect = ({ selectedValue, name, onChange, values }: CustomInputProps<string | number>) => {
    const mode = useThemeContextValue();

    return (
        <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
            {name}:
            <select className="uniform-width" value={selectedValue} onChange={onChange}>
                {values.map(({ value, name }) => (
                    <option key={value} value={value}>
                        {getDefaultLanguageTextOrFallback(name)}
                    </option>
                ))}
            </select>
        </label>
    );
};
