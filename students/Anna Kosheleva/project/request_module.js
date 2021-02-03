'use strict';

const API_URL = 'http://localhost:3000/api';

const makeGETRequest = (path, method = 'GET', body = {}) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.timeout = 5000;

        xhr.ontimeout = () => {
            console.log('Timeout!');
        }

        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else{
                    console.log('Error!', xhr.responseText);
                    reject(xhr.responseText);
                }
            }
        }

        xhr.open(method, `${API_URL}/${path}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));
    });
};

export default makeGETRequest;