export const prepearUsersList = (users) => Object.values(users);

const validateUserName = (userName) => userName && typeof userName === 'string';
const validateAge = (age) => age && typeof age === 'number';
const validateHobbies = (hobbies) => hobbies && Array.isArray(hobbies)
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

export const checkSchema = (value) => {
    const {username, age, hobbies} = value;
    let error = '';
// а тут ведь нет проверки на обязательность
    Object.keys(validator).forEach((key) => {
        const {validate, errorMessage} = validator[key];

        if (!value[key] || !validate(value[key])) {
            error += `${validator[key].errorMessage} `
        };
    });
    
    return error;
};
