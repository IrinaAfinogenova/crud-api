import {ServerResponse} from 'http';
import {validate as uuidValidate} from 'uuid';
import {USERS} from '../database'; // TODO сделать как абсолютный путь
import {sendError} from './send-error';

export const sendUser = (response: ServerResponse, id: string) => {
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
