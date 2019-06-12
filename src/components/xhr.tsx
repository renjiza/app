export const baseUrl = 'http://localhost:1313/'

export function ucwords(str: string) {
    if (str != null) {
        str = str.toString();
        str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
    }
    return str;
}

export function separator(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const get = async(requestUrl: string, params: any, res: Function) => {
    const base = requestUrl.indexOf('http') !== -1 ? "" : baseUrl
    const esc = encodeURIComponent
    const queryParams = "?" + Object.keys(params).map((k: any) => esc(k) + '=' + esc(params[k])).join('&')
    fetch(base + requestUrl + queryParams, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
        },
        
    })
    .then(raw => raw.json())
    .then(response => res(response))    
}


export const post = async(requestUrl: string, params: any, res: Function, reserr: Function = (err: any) => console.log(err)) => {
    const base = requestUrl.indexOf('http') !== -1 ? "" : baseUrl
    await fetch(base + requestUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    .then(raw => raw.json())
    .then(response => res(response))
    .catch(e => reserr(e))
}

export const put = async (requestUrl: string, params: any, res: Function, reserr: Function = (err: any) => console.log(err)) => {
    const base = requestUrl.indexOf('http') !== -1 ? "" : baseUrl
    await fetch(base + requestUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
        .then(raw => raw.json())
        .then(response => res(response))
        .catch(e => reserr(e))
}

export const del = async (requestUrl: string, params: any, res: Function) => {
    const base = requestUrl.indexOf('http') !== -1 ? "" : baseUrl
    const esc = encodeURIComponent
    const queryParams = "?" + Object.keys(params).map((k: any) => esc(k) + '=' + esc(params[k])).join('&')
    await fetch(base + requestUrl + queryParams, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
        },

    })
        .then(raw => raw.json())
        .then(response => res(response))
}