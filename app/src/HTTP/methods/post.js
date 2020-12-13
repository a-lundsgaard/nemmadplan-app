

export default async function post(requestBody, extraOrdinaryUrl) {

  const urlObj = {
    'sales': this.salesUrl,
    'shopping': this.shoppingUrl
  }

  const url = extraOrdinaryUrl ? urlObj[extraOrdinaryUrl] : this.testUrl;
  
  const body = extraOrdinaryUrl ? 
  requestBody : 
  JSON.stringify({
    query: requestBody.query,
    variables: requestBody.variables,
  });

  //console.log
  
  const response = await fetch(url, {
   // signal: signal,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + requestBody?.variables?.token
    },
    body: body
  })

  const jsonData = await response.json();

  if (response.ok) {
     // console.log(jsonData);
    return jsonData;
  } else {
    console.log(jsonData)
    let err = jsonData.errors.reduce((a, n) => a + ' ' + n.message, '');
    console.error(jsonData)
    throw new Error(err)
  }
}