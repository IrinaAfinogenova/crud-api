import * as http from 'http';
import {
	sendUsersList,
	sendError,
	sendUser,
	createUser,
	updateUser,
	deleteUser
} from './handlers/index';

const server = http.createServer();

server.on('request', (request, res) => {
    const {url, method} = request;
	const [, api, users, id] = url.split('/');

	if (api !== 'api' || users !== 'users') {
		sendError(res, 'invalid request');

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
  });

server.listen(8000);
