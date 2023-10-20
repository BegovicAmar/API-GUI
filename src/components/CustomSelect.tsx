import React, { ChangeEvent } from 'react';
import { useThemeContextValue } from '../hooks/useThemeValue';
import { getDefaultLanguageTextOrFallback } from '../utils';

interface SelectValue {
    value: string;
    name: Record<string, string>;
    availability?: string;
}

interface CustomInputProps<T> {
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    selectedValue: T;
    values: SelectValue[];
    name: string;
}

export const CustomSelect = ({ selectedValue, name, onChange, values }: CustomInputProps<string | number>) => {
    const mode = useThemeContextValue();

    // Sort the values based on availability
    const sortedValues = [...values].sort((a, b) => {
        // Convert availability to number and sort in descending order
        return Number(b.availability) - Number(a.availability);
    });

    return (
        <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
            {name}:
            <select className="uniform-width" value={selectedValue} onChange={onChange}>
                {sortedValues.map(({ value, name, availability }) => (
                    <option
                        key={value}
                        value={value}
                        style={{ color: availability === '0' ? 'red' : 'black' }}
                        disabled={availability === '0'}
                    >
                        {getDefaultLanguageTextOrFallback(name)}
                        {availability ? ` (Availability: ${availability})` : ''}
                    </option>
                ))}
            </select>
        </label>
    );
};
