import {TELEDON_CHARITYCASES_BASE_URL} from './consts';

function status(response) {
    console.log('response status '+response.status);
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}

export function GetCharityCases(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let myInit = { method: 'GET',
        headers: headers,
         mode: 'cors'
    };
    let request = new Request(TELEDON_CHARITYCASES_BASE_URL, myInit);

    console.log('Inainte de fetch GET pentru '+TELEDON_CHARITYCASES_BASE_URL)

    return fetch(request,{mode: 'cors'})
        .then(status)
        .then(json)
        .then(data=> {
            console.log('Request succeeded with JSON response', data);
            return data;
        }).catch(error=>{
            console.log('Request failed', error);
            return Promise.reject(error);
        });

}

export function DeleteCharityCase(username){
    console.log('inainte de fetch delete')
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    let antet = { method: 'DELETE',
        headers: myHeaders,
       mode: 'cors'
    };

    const userDelUrl=TELEDON_CHARITYCASES_BASE_URL+'/'+username;
    console.log('URL pentru delete   '+userDelUrl)
    return fetch(userDelUrl,antet)
        .then(status)
        .then(response=>{
            console.log('Delete status '+response.status);
            return response.text();
        }).catch(e=>{
            console.log('error '+e);
            return Promise.reject(e);
        });

}

export function AddCharityCase(user){
    console.log('inainte de fetch post'+JSON.stringify(user));

    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type","application/json");

    let antet = { method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        body:JSON.stringify(user)};

    return fetch(TELEDON_CHARITYCASES_BASE_URL ,antet)
        .then(status)
        .then(response=>{
            return response.text();
        }).catch(error=>{
            console.log('Request failed', error);
            return Promise.reject(error);
        });


}

export function UpdateCharityCase(charityCase) {
    console.log('Inainte de fetch PUT: ' + JSON.stringify(charityCase));

    const headers = {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(charityCase), 
    };

    return fetch(`${TELEDON_CHARITYCASES_BASE_URL}/${charityCase.id}`, headers) 
        .then(status) 
        .then((response) => {
            return response.json(); 
        })
        .catch((error) => {
            console.log('Request failed', error);
            return Promise.reject(error); 
        });
}