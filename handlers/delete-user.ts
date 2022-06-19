import {ServerResponse} from 'http';
import {USERS} from '../database'; 
import {sendError} from './send-error';

export const deleteUser = (response: ServerResponse, id: string) => {
	if (!USERS[id]) { // все проверки
		return sendError(response, 'user not found');
	}

	USERS[id] = null;

	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify({
		data: 'success'
	}));
}