import {checkSchema} from '../utils';
import {sendError} from './send-error';
import {USERS} from '../database'; 

import {ServerResponse} from 'http';
import {UserInfo} from '../database';

export const updateUser = (response: ServerResponse, id: string, data: UserInfo) => {
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
