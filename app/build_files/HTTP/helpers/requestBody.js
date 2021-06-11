"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBody = void 0;
class RequestBody {
    constructor(string, variables = {}) {
        this.query = string;
        this.variables = variables;
    }
}
exports.RequestBody = RequestBody;
