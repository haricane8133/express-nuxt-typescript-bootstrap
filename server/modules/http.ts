import request = require("request");
import express = require("express");
import * as fs from "fs-extra";

/**
 * This is used to make HTTP requests from the server
 */
const httpClient = {
    get (url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                request(url, (error, response, body) => {
                    resolve(body);
                });
            } catch {
                reject('error');
            }
        });
    },
    post (url: string, body: any): Promise<string> {
        return new Promise((resolve, reject) => {
            try{
                request.post(url, body, (err, response, body) => {
                    resolve(body);
                });
            } catch {
                reject('error');
            }
        });
    }
}

/**
 * Helper method that is used to respond a stream containing the file of choice
 * @param res the res object associated with the http request
 * @param filepath the path of the file to be served
 * @deprecated I've replaced this with express's own sendFile method
 */
function respondStreamFile(res:express.Response, filepath: string) {
	fs.access(filepath, fs.constants.F_OK, (error) => {
		if(!error) {
			const fileStream = fs.createReadStream(filepath);
			fileStream.on('open', () => {
				fileStream.pipe(res);
			});
			fileStream.on('error', error => {
				res.writeHead(404);
				res.end(JSON.stringify(error));
			});
		} else {
			res.writeHead(404);
			res.end(JSON.stringify(error));
		}
	});
}

export {httpClient};