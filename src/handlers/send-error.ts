import {ServerResponse} from 'http';

export const sendError = (response: ServerResponse, messege: string, status: number = 404) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
      messege: messege
    }));
};
