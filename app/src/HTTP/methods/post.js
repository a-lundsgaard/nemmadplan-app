

export default async function post(requestBody, signal) {
    const response = await fetch(this.testUrl, {
        signal: signal,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' +  requestBody.variables.token
        },
       body: JSON.stringify({
        query: requestBody.query,
        variables: requestBody.variables,
      })
    })

    const jsonData = await response.json();

    if (response.ok) {
      //  console.log(jsonData);
        return jsonData;
    } else {
        console.log(jsonData)
        let err = jsonData.errors.reduce((a, n) => a + ' ' + n.message, '');
        throw new Error(err)
    }
}