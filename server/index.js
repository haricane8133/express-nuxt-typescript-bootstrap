"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var consola_1 = __importDefault(require("consola"));
var _a = require('nuxt'), Nuxt = _a.Nuxt, Builder = _a.Builder;
var path = require("path");
var app = express_1.default();
/**
 * Un Comment out the following according to requirements
 * NOTE:- each of these get fired up depending upon the header of the request
 */
app.use(express_1.default.raw());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.static(path.join(__dirname, '../static')));
/**
 * This is for enabling CORS in the server
 */
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
// Import and Set Nuxt.js options
var config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var nuxt, _a, host, port, builder;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    nuxt = new Nuxt(config);
                    _a = nuxt.options.server, host = _a.host, port = _a.port;
                    app.get("/api", function (req, res, next) {
                        res.send("Accessing an API huh!?");
                    });
                    // Listen the server
                    app.listen(port, host, function () {
                        consola_1.default.ready({
                            message: "HTTP Server Ready (Wait for NUXT) : http://" + host + ":" + port,
                            badge: true
                        });
                    });
                    if (!config.dev) return [3 /*break*/, 2];
                    builder = new Builder(nuxt);
                    return [4 /*yield*/, builder.build()];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, nuxt.ready()];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    /**
                     * use this function as a filter function
                     * Any route that has not be handled by NUXT, can be handled here
                     * If you want NUXT to handle a route, you just say next()
                     */
                    app.use(function (req, res, next) {
                        next(); // This means any other route, simply forward to Nuxt
                    });
                    // Give nuxt middleware to express
                    app.use(nuxt.render);
                    consola_1.default.ready({
                        message: "NUXT is ready!",
                        badge: true
                    });
                    return [2 /*return*/];
            }
        });
    });
}
start();
//# sourceMappingURL=index.js.map