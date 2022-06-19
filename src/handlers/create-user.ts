import {USERS} from '../database'; 

import {ServerResponse} from 'http';// TODO сделать как абсолютный путь
import {UserInfo} from '../database';
import {sendError} from './send-error';
import {checkSchema} from '../utils';
import {v4 as uuidv4} from 'uuid';

export const createUser = (response: ServerResponse, data: UserInfo) => {
	const id = uuidv4();
	const error = checkSchema(data);

	if (error) {
		return sendError(response, error, 400)
	}

	USERS[id] = {id, ...data};

	response.writeHead(201, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify({
		data: 'success'
	}));
};