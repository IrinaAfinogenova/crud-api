import http from 'http';
import dotenv from 'dotenv';
import {createUser} from './handlers/create-user';
import {deleteUser} from './handlers/delete-user';
import {sendError} from './handlers/send-error';
import {sendUser} from './handlers/send-user';
import {sendUsersList} from './handlers/send-users-list';
import {updateUser} from './handlers/update-user';

const server = http.createServer();

dotenv.config();

server.on('request', (request, res) => {
  const {url, method} = request;
	const [, api, users, id] = url.split('/');

	try {
		if (api !== 'api' || users !== 'users') {
			sendError(res, 'resourse not found');

			return;
		}

		if (method === 'GET' && !id) {
			sendUsersList(res);

			return;
			}

		if (method === 'GET' && id) {
			sendUser(res, id);

			return;
		}

		if (method === 'POST') {
			request.on('data', (data) => {
				createUser(res, JSON.parse(data));
			});

			return;
		}

		if (method === 'PUT' && !id) {
			sendUsersList(res);

			return;
		}

		if (method === 'PUT' && id) {
			request.on('data', (data) => {
				updateUser(res, id, JSON.parse(data));
			});

			return;
		}

		if (method === 'DELETE') {
			deleteUser(res, id);

			return;
		}

		sendError(res, 'invalid request');
	} catch {
		sendError(res, 'something went wrong', 500);
	}
});

server.listen(process.env.PORT || 8080);
