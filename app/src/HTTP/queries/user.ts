import { RequestBody } from '../helpers/requestBody'

export default {
    verifyUserAndReturnFields,
    signInAndReturnFields,
    signUpAndReturnFields
 };


export function signUpAndReturnFields (fieldsToQuery='', variables={}) {
    const query = `mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      createUser(userInput: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}) {
          ${fieldsToQuery}
      }
    }`;
  
  return new RequestBody(query, variables)

}

   export function verifyUserAndReturnFields (fieldsToQuery='', variables) {

        const query = `query($token: String!) {
            verifyUser(token: $token) {
              ${fieldsToQuery}
            }
          }`;
    
      //  return  {query: query, variables: variables };
        return new RequestBody(query, variables)
    }


    export function signInAndReturnFields(fieldsToQuery='', variables={}) {

        const query = `query($email: String!, $password: String!) {
            login(email: $email, password: $password ) {
                ${fieldsToQuery}
            } 
          }`
        
      //  return  {query: query, variables: variables };
        return new RequestBody(query, variables)

    }



