import * as React from 'react';
let baseURL = 'http://localhost:3000/api/'

//NOT A HOOK LMFAO
const useFetch = async (url:string,
                        body:any,
                        method:"POST"|"GET",
                        headers:{}={},
                        fullURL?:string
                        ) => {
    let resp = await fetch( fullURL? fullURL : baseURL+url, //if FullURL given use it else use base + added
        {
        method,
        body:body?JSON.stringify(body):null,
        headers:{ ...{
            'Content-Type': 'application/json'
          },
          ...headers
         }
    });

    let data = await resp.json();

    return data; 
}

//NOT A HOOK LMFAO
export const queryAPI = async (url:string,
    body:any,
    method:"POST"|"GET",
    headers:{}={}
    ) => {
let resp = await fetch( url, //if FullURL given use it else use base + added
{
method,
body:body?JSON.stringify(body):null,
headers:{ ...{
'Content-Type': 'application/json'
},
...headers
}
});

let data = await resp.json();

return data; 
}


export default useFetch;