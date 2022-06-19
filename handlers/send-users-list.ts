import {ServerResponse} from 'http';
import {USERS} from '../database';
import {prepearUsersList} from '../utils';

export const sendUsersList = (response: ServerResponse) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
      data: prepearUsersList(USERS)
    }));
};
