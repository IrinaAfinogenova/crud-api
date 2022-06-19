import {ServerResponse} from 'http';
import {validate as uuidValidate} from 'uuid';
import {USERS} from '../database'; 
import {sendError} from './send-error';

export const deleteUser = (response: ServerResponse, id: string) => {
	if (!uuidValidate(id)) {
		return sendError(response, 'user id is not valid', 400)
	}

	if (!USERS[id]) {
		return sendError(response, 'user not found');
	}

	USERS[id] = null;

	response.writeHead(204, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify({
		data: 'success'
	}));
}