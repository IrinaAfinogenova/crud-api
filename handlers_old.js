import {USERS} from './database.js';
import {
	v4 as uuidv4,
	validate as uuidValidate
} from 'uuid';
import {prepearUsersList, checkSchema} from './utils.ts';

// seporate it

export const sendError = (response, messege, status = 404) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
      messege: messege
    }));
};

export const sendUsersList = (response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
      data: prepearUsersList(USERS)
    }));
};

export const sendUser = (response, id) => {
	if (!uuidValidate(id)) {
		return sendError(response, 'user id is not valid')
	}
	
  if (!USERS[id]) {
		return sendError(response, 'user not founded'); //TODO check messsage in RS and spelling
  }

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({
    data: USERS[id]
  }));
};

export const createUser = (response, data) => {
	const id = uuidv4();
	const error = checkSchema(data);

	if (error) {
		return sendError(response, error)
	}

	USERS[id] = {id, ...data};

	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify({
		data: 'success'
	}));

};

export const updateUser = (response, id, data) => {
	const error = checkSchema(data);
	// ДРУГИЕ ОШИБОЧНЫЕ СЦЕНАРИИ
	if (error) {
		return sendError(response, error)
	}

	USERS[id] = {...USERS[id], ...data};

	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify({
		data: 'success'
	}));
};

export const deleteUser = (response, id) => {
	if (!USERS[id]) { // все проверки
		return sendError(response, 'user not found');
	}

	USERS[id] = null;

	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify({
		data: 'success'
	}));
}