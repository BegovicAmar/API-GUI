import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useThemeContextValue } from '../hooks/useThemeValue';
import { fetchEnterpriseConfiguration } from '../api';
import { getDefaultLanguageTextOrFallback } from '../utils';

export interface PoorEnterprise {
    id: string;
    name: string;
}

interface AddEnterpriseProps {
    addEnterprise: (enterprises: PoorEnterprise) => void;
}

export const AddEnterprise = ({ addEnterprise }: AddEnterpriseProps) => {
    const [showHiddenFields, setShowHiddenFields] = useState(false);
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    const mode = useThemeContextValue();
    const enterpriseIDRef = useRef<HTMLInputElement>(null);
    // const enterpriseNameRef = useRef<HTMLInputElement>(null);
    const [validationError, setValidationError] = useState<string | null>(null);

    const addEnterpriseToDropdown = async () => {
        const idValue = enterpriseIDRef.current?.value;

        if (idValue) {
            try {
                const response = await fetchEnterpriseConfiguration(idValue);
                const enterpriseName = getDefaultLanguageTextOrFallback(response.Enterprises[0].Name);
                const enterpriseId = response.Enterprises[0].Id;
                addEnterprise({ id: enterpriseId, name: enterpriseName });
                setSuccessMessage(`Enterprise "${enterpriseName}" added successfully`);
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000); // Clear the message after 3 seconds

                // Clear the input fields
                enterpriseIDRef.current.value = '';
            } catch (error) {
                // eslint-disable-next-line max-len
                // Only enters this block if fetchEnterpriseConfiguration throws an error (e.g., due to a 400 status code)
                console.error('Error validating EnterpriseID:', error);
                setValidationError('Invalid EnterpriseID.');
            }
        }
    };

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (validationError) {
            timer = setTimeout(() => {
                setValidationError(null);
            }, 5000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [validationError]);

    return (
        <div className="fields-wrapper">
            <button onClick={() => setShowHiddenFields(!showHiddenFields)}>Add Enterprise</button>
            <div className="center-content">
                {showHiddenFields && (
                    <>
                        <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
                            EnterpriseID/ConfigurationId:
                            <input className="uniform-width" type="text" ref={enterpriseIDRef} />
                        </label>
                        <button onClick={addEnterpriseToDropdown}>Submit</button>
                        {validationError && (
                            <div
                                className={clsx('error-container', {
                                    'dark-error': mode === 'dark',
                                    'light-error': mode === 'light',
                                })}
                            >
                                <span className="error-icon">⚠️</span>
                                {validationError}
                            </div>
                        )}
                        {successMessage && (
                            <div
                                className={clsx(
                                    'success-container',
                                    {
                                        'dark-success': mode === 'dark',
                                        'light-success': mode === 'light',
                                    } // Conditional classes
                                )}
                            >
                                <span className="success-icon">✅</span> {/* Display a checkmark as a success icon */}
                                {successMessage}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
