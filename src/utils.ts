import { faker } from '@faker-js/faker';

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

export const generateRandomEmail = (lastName: string) => {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@${domain}`;
};

