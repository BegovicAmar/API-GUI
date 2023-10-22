import { faker } from '@faker-js/faker';
import { DEFAULT_LANGUAGE_CODE } from './constants';

export const getTodaysDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const getEndDateFromStartDate = (getTodaysDate: string | number | Date) => {
    const date = new Date(getTodaysDate);
    date.setDate(date.getDate() + 2);

    return date.toISOString().split('T')[0];
};

export const generateRandomLastName = () => faker.person.lastName();

export const generateShortLastName = (): string => {
    let lastName = faker.person.lastName();
    while (lastName.length > 5) {
        lastName = faker.person.lastName();
    }
    return lastName;
};

export const generateRandomEmail = (lastName: string) => {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com'];
    const domain = domains[Math.floor(Math.random() * domains.length)];

    const generateRandomString = (length: number) => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const randomString = generateRandomString(4);

    return `${lastName.toLowerCase()}-${randomString}${Math.floor(Math.random() * 1000)}@${domain}`;
};

export const getDefaultLanguageTextOrFallback = (localizedPropery: Record<string, string>) => {
    if (localizedPropery[DEFAULT_LANGUAGE_CODE] != null) {
        return localizedPropery[DEFAULT_LANGUAGE_CODE];
    }
    const allLanguages = Object.keys(localizedPropery);
    return localizedPropery[allLanguages?.[0]];
};
