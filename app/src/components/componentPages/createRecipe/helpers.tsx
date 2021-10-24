import http from "../../../HTTP/http";

export default async function deleteConvertedImage(src: string) {

    console.log('Found src: ', src);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imageUrl: src
        }),
    };
    const url = http.baseUrl + "/convertimage/deleteimage";

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('found result from convert:', result);
        })
        .catch(error => console.log('error', error));
}