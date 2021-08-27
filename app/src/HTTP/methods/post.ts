

export default async function post(requestBody: Object, extraOrdinaryUrl?: Object) {

  const urlObj = {
    'sales': this.salesUrl,
    'shopping': this.shoppingUrl  
  }

  const url = extraOrdinaryUrl ? urlObj[extraOrdinaryUrl] : this.requestUrl;
  
  const body = extraOrdinaryUrl ? 
  requestBody : 
  JSON.stringify({
    query: requestBody.query,
    variables: requestBody.variables,
  });

  //console.log

  try {

    const response = await fetch(url, {
      // signal: signal,
       method: 'POST',
       //mode: 'no-cors',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + requestBody?.variables?.token
       },
       body: body
     })
   
     const jsonData = await response.json();
   
     if (response.ok && response.status === 200 && !jsonData.errors) {
         console.log( 'Returned data from api: ',jsonData);
       return jsonData;
     } else {
       const err = jsonData.errors.reduce((a, n) => a + ' ' + n.message, '');
    /*    if(err.includes('unathenticated')) {
         location.reload();
       } */
       throw err;
       
     }
    
  } catch (error) {    
    console.error(error);
    throw error;
  }
  

}