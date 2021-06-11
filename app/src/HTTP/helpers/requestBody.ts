export class RequestBody {
    constructor(string, variables={}) {
        this.query = string
        this.variables = variables
    }
}