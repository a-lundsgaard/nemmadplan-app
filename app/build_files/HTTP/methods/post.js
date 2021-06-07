"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function post(requestBody, extraOrdinaryUrl) {
    var _a;
    const urlObj = {
        'sales': this.salesUrl,
        'shopping': this.shoppingUrl
    };
    const url = extraOrdinaryUrl ? urlObj[extraOrdinaryUrl] : this.prodUrl;
    const body = extraOrdinaryUrl ?
        requestBody :
        JSON.stringify({
            query: requestBody.query,
            variables: requestBody.variables,
        });
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + ((_a = requestBody === null || requestBody === void 0 ? void 0 : requestBody.variables) === null || _a === void 0 ? void 0 : _a.token)
        },
        body: body
    });
    const jsonData = await response.json();
    if (response.ok && response.status === 200) {
        return jsonData;
    }
    else {
        console.log(jsonData);
        let err = jsonData.errors.reduce((a, n) => a + ' ' + n.message, '');
        console.error(jsonData);
        throw new Error(err);
    }
}
exports.default = post;
