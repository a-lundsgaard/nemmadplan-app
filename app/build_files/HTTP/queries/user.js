"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInAndReturnFields = exports.verifyUserAndReturnFields = exports.signUpAndReturnFields = void 0;
const requestBody_1 = require("../helpers/requestBody");
exports.default = {
    verifyUserAndReturnFields,
    signInAndReturnFields,
    signUpAndReturnFields
};
function signUpAndReturnFields(fieldsToQuery = '', variables = {}) {
    const query = `mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      createUser(userInput: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}) {
          ${fieldsToQuery}
      }
    }`;
    return new requestBody_1.RequestBody(query, variables);
}
exports.signUpAndReturnFields = signUpAndReturnFields;
function verifyUserAndReturnFields(fieldsToQuery = '', variables) {
    const query = `query($token: String!) {
            verifyUser(token: $token) {
              ${fieldsToQuery}
            }
          }`;
    return new requestBody_1.RequestBody(query, variables);
}
exports.verifyUserAndReturnFields = verifyUserAndReturnFields;
function signInAndReturnFields(fieldsToQuery = '', variables = {}) {
    const query = `query($email: String!, $password: String!) {
            login(email: $email, password: $password ) {
                ${fieldsToQuery}
            } 
          }`;
    return new requestBody_1.RequestBody(query, variables);
}
exports.signInAndReturnFields = signInAndReturnFields;
