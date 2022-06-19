import {ServerResponse} from 'http';
import {validate as uuidValidate} from 'uuid';
import {USERS} from '../database';
import {sendError} from './send-error';

export const sendUser = (response: ServerResponse, id: string) => {
	if (!uuidValidate(id)) {
		return sendError(response, 'user id is not valid', 400)
	}
	
  if (!USERS[id]) {
		return sendError(response, 'user not founded');
  }

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({
    data: USERS[id]
  }));
};
