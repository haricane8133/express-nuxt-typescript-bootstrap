"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var fs = __importStar(require("fs-extra"));
/**
 * This is used to make HTTP requests from the server
 */
var httpClient = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            try {
                request(url, function (error, response, body) {
                    resolve(body);
                });
            }
            catch (_a) {
                reject('error');
            }
        });
    },
    post: function (url, body) {
        return new Promise(function (resolve, reject) {
            try {
                request.post(url, body, function (err, response, body) {
                    resolve(body);
                });
            }
            catch (_a) {
                reject('error');
            }
        });
    }
};
exports.httpClient = httpClient;
/**
 * Helper method that is used to respond a stream containing the file of choice
 * @param res the res object associated with the http request
 * @param filepath the path of the file to be served
 * @deprecated I've replaced this with express's own sendFile method
 */
function respondStreamFile(res, filepath) {
    fs.access(filepath, fs.constants.F_OK, function (error) {
        if (!error) {
            var fileStream_1 = fs.createReadStream(filepath);
            fileStream_1.on('open', function () {
                fileStream_1.pipe(res);
            });
            fileStream_1.on('error', function (error) {
                res.writeHead(404);
                res.end(JSON.stringify(error));
            });
        }
        else {
            res.writeHead(404);
            res.end(JSON.stringify(error));
        }
    });
}
//# sourceMappingURL=http.js.map