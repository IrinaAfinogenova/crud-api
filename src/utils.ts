import {User} from './database';

export const prepearUsersList = (users: Record<string, User>) => Object.values(users).filter(Boolean);

//TODO any не ошибка - а указатель рандомное значение

const validateUserName = (userName: any) => userName && typeof userName === 'string';
const validateAge = (age: any) => age && typeof age === 'number';
const validateHobbies = (hobbies: any) => hobbies && Array.isArray(hobbies)
    && (hobbies.every(item => typeof item === 'string'))

const validator = {
    username: {
        validate: validateUserName,
        errorMessage: 'username must be a string'
    },
    age: {
        validate: validateAge,
        errorMessage: 'age must be a number'
    },
    hobbies: {
        validate: validateHobbies,
        errorMessage: 'hobbies must be a array of strings or empty array'
    }
}

export const checkSchema = (value: Record<string, any>) => {
    const {username, age, hobbies} = value;
    let error = '';

    Object.keys(validator).forEach((key) => {
        const {validate, errorMessage} = validator[key];

        if (!value[key] || !validate(value[key])) {
            error += `${validator[key].errorMessage} `
        };
    });
    
    return error;
};
