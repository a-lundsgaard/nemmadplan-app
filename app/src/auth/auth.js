import { HTTP } from '../HTTP/http.js';
import regeneratorRuntime from "regenerator-runtime";


class Auth {
    constructor() {
        this.authenticated = false;
    }
    
    async login(userSchema, onSucces, onFailure) {
        const token = 'token';
        try {
            const user = await HTTP.post(userSchema); 
            console.log(user);
            this.authenticated = true;
            localStorage.setItem(token, user.data.login.token);
            onSucces(user)
        } catch (error) {
            console.log(error);
            onFailure(error);
        }
    }

    logout(onLogout, token) {
        this.authenticated = false
        sessionStorage.removeItem(token)
        onLogout()
    }

    isAuthenticated() {
        return this.authenticated
    }

}

export default new Auth();