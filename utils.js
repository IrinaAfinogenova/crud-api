export const prepearUsersList = (users) => Object.values(users);

export const parseData = (data) => {
    if (!data) {
        return null;
    }

    console.log( data.split('&'))

    return data.split('&').reduce((acc, item) => {
        const [key, value] = item.split('='); // не знаю как но нужно сделать проверку на тип данных
        acc[key] = value;

        return acc;
    }, {})
};

const validateUserName = (userName) => username && typeof username === 'string';
const validateAge = (age) => age && typeof age === 'number';
const validateHobbies = (hobbies) => hobbies && Array.isArray(hobbies)
    && hobbies.some(item => typeof item !== 'string')

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

    Object.keys(validator).forEach((key) => {
        const {validate, errorMessage} = validator[key];

        if (!value[key] || !validate(value[key])) {
            error += `${validator[key].errorMessage} `
        };
    });
    
    return error;
}