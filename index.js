import http from 'http';
import url from 'url';
import {
	sendUsersList,
	sendError,
	sendUser,
	createUser,
	updateUser
} from './handlers.js';

import { writeFile } from 'fs/promises';

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
		sendUser(res, Number(id));

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


	sendError(res, 'invalid request');
  });

server.listen(8000);